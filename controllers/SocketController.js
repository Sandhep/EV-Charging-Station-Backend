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

        socket.on('disconnect', (reason) => {

            console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
            
        });

        socket.send('Welcome to the WebSocket server!');
    }
}

export default new SocketController();
