import db from "../../repository/models/index.js";

class StationFinder{

    async searchbyLocation(location){

      const Stations = await db.ChargingStation.findAll({
        where: { Location: location }, 
        include: {
          model: db.Charger,
          as:"Chargers",
          attributes: ['ChargerID', 'Type', 'Capacity', 'Status'],
        },
        attributes: ['StationID','Name', 'Location','Address']
      });
      
      return Stations;
    }
    
    async searchbyFilter(filter){  

      const Stations = await db.ChargingStation.findAll({
        include: {
          model: db.Charger,
          as:"Chargers",
          where:{Type:filter},
          attributes: ['ChargerID', 'Type', 'Capacity', 'Status'],
        },
        attributes: ['StationID','Name', 'Location','Address']
      });

      return Stations;
        
    }

    async searchStations(location,filter){

      const Stations = await db.ChargingStation.findAll({
        where: { Location: location }, 
        include: {
          model: db.Charger,
          as:"Chargers",
          where:{ Type: filter },
          attributes: ['ChargerID', 'Type', 'Capacity', 'Status'],
        },
        attributes: ['StationID','Name', 'Location','Address']
      });

      return Stations;
    }

    async getStations(){

      const Stations = await db.ChargingStation.findAll({
        include: {
          model: db.Charger,
          as:"Chargers",
          attributes: ['ChargerID', 'Type', 'Capacity', 'Status'],
        },
        attributes: ['StationID','Name', 'Location','Address']
      });
      
      return Stations;

    }

}

export default new StationFinder();