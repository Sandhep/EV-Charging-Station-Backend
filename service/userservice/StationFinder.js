class StationFinder{

    constructor(){

        this.stationData = [
            {
              id: 1,
              name: "Central Station Charging Hub",
              type: "AC",
              address: "123 Main Street, Downtown",
              availability: "Available",
              power: "7.4"
            },
            {
              id: 2,
              name: "Express Charging Point",
              type: "DC",
              address: "456 Park Avenue, Uptown",
              availability: "Busy",
              power: "50"
            },
            {
              id: 3,
              name: "Shopping Mall Charger",
              type: "AC",
              address: "789 Market Street",
              availability: "Available",
              power: "11"
            },
            {
              id: 4,
              name: "Highway Rest Stop Station",
              type: "DC",
              address: "Highway 101, Mile Marker 45",
              availability: "Available",
              power: "150"
            },
            {
              id: 5,
              name: "City Center Parking Garage",
              type: "AC",
              address: "25 Downtown Plaza",
              availability: "Busy",
              power: "22"
            },
            {
              id: 6,
              name: "Tech Park Charging Station",
              type: "DC",
              address: "100 Innovation Drive",
              availability: "Available",
              power: "100"
            },
            {
              id: 7,
              name: "Residential Complex Hub",
              type: "AC",
              address: "555 Apartment Boulevard",
              availability: "Available",
              power: "7.4"
            },
            {
              id: 8,
              name: "Supermarket Quick Charge",
              type: "DC",
              address: "200 Retail Row",
              availability: "Busy",
              power: "50"
            },
            {
              id: 9,
              name: "Hotel Valet Charging",
              type: "AC",
              address: "888 Luxury Lane",
              availability: "Available",
              power: "22"
            },
            {
              id: 10,
              name: "Airport Long-Term Parking",
              type: "DC",
              address: "1 Airport Terminal Road",
              availability: "Available",
              power: "150"
            }
          ];
    }

    async searchbyLocation(location){

       return this.stationData.filter(station =>{

        const matchesSearch = station.name.toLowerCase().includes(location.toLowerCase()) || station.address.toLowerCase().includes(location.toLowerCase());

        return matchesSearch;

       })
    }
    
    async searchbyFilter(filter){

        return this.stationData.filter(station =>{

            const matchesSearch = filter === 'all' || station.type === filter;
    
            return matchesSearch;
    
        })
        
    }

    async searchStations(location,filter){

        return this.stationData.filter(station =>{

            const matchesSearch = station.name.toLowerCase().includes(location.toLowerCase()) || station.address.toLowerCase().includes(location.toLowerCase());
            
            const matchesType = station.type === filter;

            return matchesSearch && matchesType;
    
        })

    }

    async getStations(){
        
        return this.stationData;

    }

}

export default new StationFinder();