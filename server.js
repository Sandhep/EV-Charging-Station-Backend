import { createServer } from "http";
import { Server } from "socket.io";
import app from './app.js';
import SocketController from "./controllers/SocketController.js";
import dotenv from 'dotenv';
import { authenticateSocketToken } from "./middleware/authenticateToken.js";

dotenv.config();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    const websocketProtocol = process.env.NODE_ENV === "production" ? "wss" : "ws";
    const httpProtocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = process.env.HOST || "localhost";

    const websocketUrl = `${websocketProtocol}://${host}:${PORT}`;
    const serverUrl = `${httpProtocol}://${host}:${PORT}`;

    console.log(`Server is running on port ${PORT}`);
    console.log(`HTTP Server URL: ${serverUrl}`);
    console.log(`WebSocket URL: ${websocketUrl}`);
});

io.use(authenticateSocketToken);

io.on('connection', (socket) => {
    SocketController.handleSocketConnection(socket, io);
});

export default io;
