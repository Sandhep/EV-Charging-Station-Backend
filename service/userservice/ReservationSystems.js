class ReservationSystem{
    async bookSlot(bookingData,userData){

      console.log(bookingData);
      console.log(userData);

      // 1.Update the Charger Table with status - 'Booked' using chargerId & stationId.
      // 2.Create a new record in Bookings Table using bookingData & userData.

      return 'Slot Booked Successfully';
    }

    async manageCancellations(bookingData){

      console.log(bookingData);

      // 2.Access the Charger table with ChargerID and set status as Available
      // 3.Access bookings table set the status as Cancelled with bookingId

      return 'Slot Cancelled Successfully';

    }

    async viewBookingHistory(userId){

       // 1.Get bookings data of specific user using their userId in Bookings Table

       const bookingData = [
        {
          "UserID": "a2fa41b1-dbd4-4264-9955-9eeef12988e6",
          "BookingID": "256",
          "ChargerID": "22",
          "VehicleID": "323",
          "StartTime": "10.00",
          "EndTime": "11.00",
          "Status": "Booked"
        },
        {
          "UserID": "a2fa41b1-dbd4-4264-9955-9eeef12988e6",
          "BookingID": "257",
          "ChargerID": "23",
          "VehicleID": "324",
          "StartTime": "11.00",
          "EndTime": "12.00",
          "Status": "Completed"
        },
        {
          "UserID": "a2fa41b1-dbd4-4264-9955-9eeef12988e6",
          "BookingID": "258",
          "ChargerID": "24",
          "VehicleID": "325",
          "StartTime": "12.00",
          "EndTime": "13.00",
          "Status": "Cancelled"
        },
        {
          "UserID": "a2fa41b1-dbd4-4264-9955-9eeef12988e6",
          "BookingID": "259",
          "ChargerID": "25",
          "VehicleID": "326",
          "StartTime": "13.00",
          "EndTime": "14.00",
          "Status": "Completed"
        },
        {
          "UserID": "a2fa41b1-dbd4-4264-9955-9eeef12988e6",
          "BookingID": "260",
          "ChargerID": "26",
          "VehicleID": "327",
          "StartTime": "14.00",
          "EndTime": "15.00",
          "Status": "Booked"
        }
      ];

       return bookingData;
    }
}

export default new ReservationSystem();