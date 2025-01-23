import { v4 as uuidv4 } from "uuid";
import db from "../../repository/models/index.js";

class ChargingSessionMonitoring {
  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
    this.activeSessions = {};
  }

  async startCharging({ ChargerID, BookingID, StationID, StationName, Power, Type }) {
    try {
      const sessionId = uuidv4();
      const startTime = new Date();

      this.activeSessions[sessionId] = {
          ChargerID,
          BookingID,
          StationID,
          StationName,
          Power,
          Type,
          status: "Charging",
          progress: 0,
          cost: 0,
          startTime,
      };

      this.io.to(this.socket.id).emit("chargingStarted", { sessionId, ChargerID, message: "Charging started." });
      await this.monitorProgress(sessionId, ChargerID);
   } catch (error) {
      console.error("Error in startCharging:", error.message);
      this.io.to(this.socket.id).emit("error", { message: "Failed to start charging." });
   }
  }

  async stopCharging({ sessionId, ChargerID }) {
    const session = this.activeSessions[sessionId];
    if (!session) {
      console.warn(`No active session found for sessionId: ${sessionId}`);
      return;
    }
    if (session.status !== "Charging") {
      console.log(`Session ${sessionId} is already stopped.`);
      return;
    }

    const endTime = new Date();
    session.status = "Stopped";
    await this.saveSessionToDatabase(sessionId, session, endTime);

    this.io.to(this.socket.id).emit("chargingStopped", { sessionId, ChargerID, message: "Charging stopped.", sessionDetails: session });
    delete this.activeSessions[sessionId];
  }

  async monitorProgress(sessionId, ChargerID) {
    const session = this.activeSessions[sessionId];
    if (!session) return;

    const intervalId = setInterval(() => {
      if (session.status !== "Charging") {
        clearInterval(intervalId);
        return;
      }

      const PROGRESS_INCREMENT = 2.5;
      const COST_INCREMENT = 0.5;

      session.progress = Math.min(session.progress + PROGRESS_INCREMENT, 100);
      session.cost += COST_INCREMENT;

      this.io.to(this.socket.id).emit("chargingUpdate", { sessionId, ChargerID, progress: session.progress, cost: session.cost });

      if (session.progress >= 100) {
        clearInterval(intervalId);
        session.status = "Completed";
        this.saveSessionToDatabase(sessionId, session, new Date());
        this.io.to(this.socket.id).emit("chargingCompleted", { sessionId, ChargerID, message: "Charging completed.", sessionDetails: session });
        delete this.activeSessions[sessionId];
      }
    }, 2000);
  }

  async saveSessionToDatabase(sessionId, session, endTime) {
    try {
      await db.ChargingSession.create({
        SessionID: sessionId,
        BookingID: session.BookingID,
        ChargerID: session.ChargerID,
        StartTime: session.startTime,
        EndTime: endTime,
        EnergyConsumed: session.progress,
        Cost: session.cost,
      });
    } catch (error) {
      console.error("Error Saving data in Database", error.message);
    }
  }

  async cleanupOnDisconnect() {
    const cleanedSessions = [];
    for (const [sessionId, session] of Object.entries(this.activeSessions)) {
        if (session.status === "Charging") {
            await this.stopCharging({ sessionId, ChargerID: session.ChargerID });
            cleanedSessions.push({ sessionId, ChargerID: session.ChargerID });
        }
    }
    console.log(`Cleanup resources for socket: ${this.socket.id}`);
    return cleanedSessions;
}

}

export default ChargingSessionMonitoring;
