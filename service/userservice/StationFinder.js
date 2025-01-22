import db from "../../repository/models/index.js";

class StationFinder{

    async searchbyLocation(location){

      const Stations = await db.Charger.findAll({
        include:{
          model : db.ChargingStation,
          as:"Station",
          where: { Location: location },
          attributes:['StationID','Name', 'Location','Address']
        },
        attributes: ['ChargerID', 'Type', 'Capacity', 'Status']
     })
     
      return Stations;
    }
    
    async searchbyFilter(filter){  

      const Stations = await db.Charger.findAll({
        where:{ Type: filter },
        include:{
          model : db.ChargingStation,
          as:"Station",
          attributes:['StationID','Name', 'Location','Address']
        },
        attributes: ['ChargerID', 'Type', 'Capacity', 'Status']
     })
     
      return Stations;
        
    }

    async searchStations(location,filter){

      const Stations = await db.Charger.findAll({
        where:{ Type: filter },
        include:{
          model : db.ChargingStation,
          as:"Station",
          where: { Location: location },
          attributes:['StationID','Name', 'Location','Address']
        },
        attributes: ['ChargerID', 'Type', 'Capacity', 'Status']
     })
     
      return Stations;
    }

    async getStations(){

      const Stations = await db.Charger.findAll({
         include:{
           model : db.ChargingStation,
           as:"Station",
           attributes:['StationID','Name', 'Location','Address']
         },
         attributes: ['ChargerID', 'Type', 'Capacity', 'Status']
      })
      
      return Stations;

    }

}

export default new StationFinder();