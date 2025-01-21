import db from "../../repository/models/index.js";

class ReservationSystem {

    async bookSlot(bookingData,userData){

      const newBooking = await db.Booking.create({
        UserID: userData.userID,
        ChargerID: bookingData.ChargerID,
        VehicleID: bookingData.VehicleID,
        StartTime: bookingData.StartTime,
        EndTime: bookingData.EndTime,
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

      await db.Booking.update(
        { Status: 'Cancelled' },
        {
          where: {
            BookingID: bookingData.BookingID, 
          },
        }
      );

      await db.Charger.update(
        { Status: 'Active' },
        {
          where: {
            ChargerID:bookingData.ChargerID, 
          },
        }
      );

      return 'Slot Cancelled Successfully !';

    }

    async viewBookingHistory(userId){

       const bookingData = await db.Booking.findAll({
          where:{UserID:userId},
          attributes :['BookingID','ChargerID','VehicleID','StartTime','EndTime','Status']
       })

       return bookingData;
    }
}

export default new ReservationSystem();