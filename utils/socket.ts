import io from "socket.io-client";

const endpoint: string = process.env.NEXT_PUBLIC_DOMAIN;
const socket: SocketIOClient.Socket = io(endpoint);

export default socket;