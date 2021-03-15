import io from "socket.io-client";

const port: string = process.env.NODE_ENV === 'production' ? "" : ":3000";

const endpoint: string = `${window.location.hostname}${port}`;
const socket: SocketIOClient.Socket = io(endpoint);

export default socket;