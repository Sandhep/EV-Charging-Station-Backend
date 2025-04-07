import db from "../../repository/models/index.js";

class VehicleService {

    async addVehicles(userID,vehicleData){

            const newVehicle = await db.Vehicle.create({
                UserID: userID,
                LicensePlateNumber: vehicleData.LicensePlateNumber,
                Make: vehicleData.Make,
                Model: vehicleData.Model,
                BatteryCapacity: vehicleData.BatteryCapacity,
            });
    
            return newVehicle;
    }

    async updateVehicles(vehicleData){

      await db.Vehicle.update(
        {
          LicensePlateNumber: vehicleData.LicensePlateNumber,
          Make: vehicleData.Make,
          Model: vehicleData.Model,
          BatteryCapacity: vehicleData.BatteryCapacity,
        },
        {
          where: {
            VehicleID:vehicleData.VehicleID
          },
        }
      );

      return "Vehicles Details Updated";
    }

    async getVehicles(userID){

            const vehicle = await db.Vehicle.findAll({
                where:{
                  UserID:userID
                },
              })
        
            return vehicle;
    }

    async deleteVehicle(VehicleID){

      const vehicle = await db.Vehicle.destroy({
          where:{
            VehicleID:VehicleID
          },
        })
  
      return vehicle;
   }
}

export default new VehicleService();