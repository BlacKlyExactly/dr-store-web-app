import { useEffect, useState } from "react";
import Rps, { RpsMark, RpsPlayer } from "../rps";
import { UserData } from "./useUser";
import socket from "utils/socket";

export type SocketData = {
    queue: RpsPlayer[],
    currentGame: RpsPlayer[]
}

export type SocketTimeData = {
    game: RpsPlayer[],
    timeGame: number
}

const useRps = ( userData: UserData ) => {
    const [ game, setGame ] = useState<RpsPlayer[]>([]);
    const [ gameTime, setGameTime ] = useState<number>();

    useEffect(() => {
        socket.on("rpsHookQueueChange", ({ currentGame }: SocketData ) => setGame(currentGame));
        socket.on("rpsHookMarkSelect",  ({ currentGame }: SocketData ) => setGame(currentGame));
        socket.on("rpsHookGameRemove",  ({ currentGame }: SocketData ) => setGame(currentGame));

        socket.on("rpsTimeChange",  ({ time, game }) => {
            setGameTime(time);
            setGame(game);
        });

        socket.on("rpsTimeEnd", ({ game }) => setGame(game));

        return () => {
            socket.disconnect();
        }
    }, [ ])

    const addToQueue = () => socket.emit("rpsAddToQueue", {
        id: userData.steamId,
        name: userData.name,
        avatar: userData.avatar
    })
    
    const removeFromQueue = () => socket.emit("rpsRemoveFromQueue", {
        id: userData.steamId,
    })

    const removeGame = ( player: RpsPlayer ) => socket.emit("rpsRemoveGame", player);

    const setMark = ( mark: RpsMark ) => socket.emit("rpsSetMark", {
        id: userData.steamId,
        mark
    })
    
    return { addToQueue, removeFromQueue, setMark, removeGame, socket, game, gameTime };
}

export default useRps;