import io from "socket.io-client";

const endpoint: string = "http://localhost:3000";
const socket: SocketIOClient.Socket = io(endpoint);

export default socket;