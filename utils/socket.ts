import io from "socket.io-client";

const endpoint: string = process.env.NODE_ENV === "production" ? `${process.env.NEXT_PUBLIC_DOMAIN}` : "http://localhost:3000"
const socket: SocketIOClient.Socket = io(endpoint, {
    reconnectionDelay: 1000,
    reconnection: true,
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
});

export default socket;