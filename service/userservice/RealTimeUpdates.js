class RealTimeUpdates {
    constructor() {
        this.users = new Map(); // Stores UserID -> ChargerID pairs
    }

    async getStationAvailability(notifyData) {
        this.users.set(notifyData.userID, notifyData.ChargerID);
        console.log("Current Users Map:");
        this.users.forEach((chargerID, userID) => {
            console.log(`UserID: ${userID}, ChargerID: ${chargerID}`);
        });
        return `Will be notified for the available slot of Charger:${notifyData.ChargerID}`;
    }

    async sendNotification(io, chargerID) {

        // Find the UserID(s) associated with the given ChargerID
        this.users.forEach((storedChargerID, userID) => {
            if (storedChargerID === chargerID) {
                // Emit notification to the specific user
                io.emit(`notify_${userID}`, `Charger with ID:${chargerID} is available!`);

                // Remove the UserID-ChargerID pair from the map
                this.users.delete(userID);
            }
        });
    }

    async sendPushNotification(){
        
    }
}

export default new RealTimeUpdates();
