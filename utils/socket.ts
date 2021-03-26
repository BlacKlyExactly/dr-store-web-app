import io from "socket.io-client";

const endpoint: string = `${process.env.NEXT_PUBLIC_DOMAIN}:${process.env.PORT || 3000}`;
const socket: SocketIOClient.Socket = io(endpoint, {
    reconnectionDelay: 1000,
    reconnection: true,
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
});

export default socket;