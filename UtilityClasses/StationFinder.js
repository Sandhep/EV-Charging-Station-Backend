class StationFinder{
    constructor(location,filter){
        this.location = location;
        this.filter = filter;
        this.arr= [{name:"StationA",type:"DC"},{name:"StationB",type:"AC"},{name:"StationC",type:"DC"},{name:"StationD",type:"DC"},{name:"StationE",type:"AC"}];
    }
    
    searchNearbyStations(){
        return this.arr;
    }

    filterStations(filter){
        return this.arr.filter(station => station.type === filter);
    }
}

export default StationFinder;