import db from "../../repository/models/index.js";

class ReservationSystem {

    async bookSlot(bookingData,userData){

      const newBooking = await db.Booking.create({
        UserID: userData.userID,
        ChargerID: bookingData.ChargerID,
        VehicleID: bookingData.VehicleID,
        Time: bookingData.Time,
        Duration: bookingData.Duration,
        Date: bookingData.Date,
        Status: 'Booked'
      });

      await db.Charger.update(
        { Status: 'Booked' },
        {
          where: {
            ChargerID:bookingData.ChargerID, 
          },
        }
      );

      return newBooking;
    }

    async manageCancellations(bookingData){

      // Fetch the booking data with its associated Charger
        const booking = await db.Booking.findOne({
          where: { BookingID: bookingData.BookingID },
          include: {
            model: db.Charger,
            as: "Charger",
          },
        });

        // Ensure the booking exists before proceeding
        if (booking) {
          // Update the booking's status
          await booking.update({ Status: "Cancelled" });

          // Update the associated charger's status
          if (booking.Charger) {
            await booking.Charger.update({ Status: "Available" });
          }
        } else {
          console.error("Booking not found!");
        }

      return 'Slot Cancelled Successfully !';

    }

    async viewBookingHistory(userId){

      const bookingData = await db.Booking.findAll({
        where: { UserID: userId },
        include: [
          {
            model: db.Charger,
            as: "Charger",
            include:{
              model : db.ChargingStation,
              as:"Station",
              attributes:['StationID','Name']
            },
            attributes: ["Type", "Capacity"],
          },
          {
            model: db.Vehicle,
            as: "Vehicle",
            attributes: ["Make", "Model"],
          },
        ],
        attributes: ["BookingID","ChargerID","VehicleID","Time","Date","Duration","Status",],
      });
      
       return bookingData;
    }
}

export default new ReservationSystem();