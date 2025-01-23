import ChargingSessionMonitoring from "../service/userservice/ChargingSessionMonitoring.js";

class SocketController {
 
    async handleSocketConnection(socket, io) {

        console.log(`Client connected: ${socket.id}`);

        socket.on('message', (data) => {

            console.log(`Message received for message-event from ${socket.id}:`, data);
            
            io.emit('available','Slot Availale');

        });

        socket.on('notify', (data) => {

            console.log(`Message received for checkslot-event from ${socket.id}:`, data);

            socket.emit('response-event', { status: 'success', receivedData: data });

        });

        const ChargingSession = new ChargingSessionMonitoring(socket,io);

        // Handle startCharging event
        socket.on("startCharging", async (data) => {
            await ChargingSession.startCharging(data);
        });

        // Handle stopCharging event
        socket.on("stopCharging", async (data) => {
            await ChargingSession.stopCharging(data);
        });

        // Handle disconnect event
        socket.on("disconnect", async () => {
            console.log("User disconnected:", socket.id);
            const sessionData = await ChargingSession.cleanupOnDisconnect();
            io.to(socket.id).emit("userDisconnected", {
                message: "User has been disconnected and sessions cleaned up.",
                sessionData,
            });
        });

    }
}

export default new SocketController();
