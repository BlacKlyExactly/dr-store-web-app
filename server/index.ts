import { IncomingMessage, ServerResponse, Server as HttpServer } from 'http';
import next from "next";
import express from "express";
import { Socket, Server as SocketServer } from "socket.io";
import cron from "node-cron";
import Rps, { RpsPlayer } from "../rps";

const port = process.env.PORT || 3000;
const app = express();
const server = new HttpServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*"
  }
});

const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

let rpsGame: Rps;

io.sockets.on("connection", ( socket: Socket ) => {
  if(!rpsGame) rpsGame = new Rps(io);

  cron.schedule('0 1 * * *', () => {
    io.emit("dailyReminder");
  });

  socket.on("giftSend", ({ steamId, name, itemName }) => {
    io.emit("giftRecive", {
      steamId,
      name,
      itemName
    })
  })

  socket.on("rpsAddToQueue", ({ name, id, avatar }) => {
    rpsGame.addToQueue(name, id, avatar);

    io.emit("rpsHookQueueChange", { 
      queue: rpsGame.getQueue(),
      currentGame: rpsGame.getPlayerGame(id),
    })
  });

  socket.on("rpsRemoveFromQueue", ({ id }) => {
    rpsGame.removeFromQueue(id);

    io.emit("rpsHookQueueChange", { 
      queue: rpsGame.getQueue(),
      currentGame: rpsGame.getPlayerGame(id),
    })
  });

  socket.on("rpsRemoveGame", ( player ) => {
    rpsGame.removeGame(player);

    io.emit("rpsHookGameRemove", { 
      queue: rpsGame.getQueue(),
      currentGame: rpsGame.getPlayerGame(player.id),
    })
  });

  socket.on("rpsSetMark", ({ id, mark }) => {
    const player: RpsPlayer | undefined = rpsGame.getPlayer(id);
    player && rpsGame.setMark(player, mark);

    io.emit("rpsHookMarkSelect", { 
      queue: rpsGame.getQueue(),
      currentGame: rpsGame.getPlayerGame(id)
    });
  });
});

nextApp.prepare().then(() => {
  app.get('*', ( req: IncomingMessage, res: ServerResponse ) => handle(req, res));
  server.listen(port, () => console.log(`> Ready on port -> ${port}`));
})
