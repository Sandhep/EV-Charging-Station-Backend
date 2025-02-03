import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import StationFinder from './userservice/StationFinder.js';
import ReservationSystems from './userservice/ReservationSystems.js';
import RealTimeUpdates from './userservice/RealTimeUpdates.js';
import db from '../repository/models/index.js';

class User {

  async register({ name, email, phoneNumber, password }) {

    if (!name || !email || !phoneNumber || !password) {
      throw new Error('All fields are required');
    }

    const userExists = await db.UserModel.findOne({
      where: {
        Email: email,
      },
    });
    
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.UserModel.create({
      Name: name,
      Email: email,
      PhoneNumber: phoneNumber,
      PasswordHash:hashedPassword
    });
    
    return newUser; 
  }

  async login({ email, password }) {

    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    const user = await db.UserModel.findOne({
      where: {
        Email: email,
      },
    });
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userID: user.UserID, email: user.Email },
       process.env.JWT_ACCESS_SECRET,
      { expiresIn: '7d' }
    );

    return { message: 'Login successful', token };
  }

  async getProfile(userID) {

    const user = await db.UserModel.findOne({
      where: {
        UserID: userID,
      },
      attributes:['UserID','Name','Role','Email','PhoneNumber']
    });
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getVehicles(userID){

      const vehicle = await db.Vehicle.findAll({
        where:{
          UserID:userID
        },
      })

      return vehicle;
  }

  async getStationdata(location,type){
      
    if(!location && !type){

       return await StationFinder.getStations();

    }else if(location && !type){

       return await StationFinder.searchbyLocation(location);

    }else if(!location && type){
  
       return await StationFinder.searchbyFilter(type);

    }else{

       return await StationFinder.searchStations(location,type);

    }

  }

  async bookSlot(bookingData,userData){

     return  await ReservationSystems.bookSlot(bookingData,userData);
  }

  async myBookings(userID){

     return await ReservationSystems.viewBookingHistory(userID);

  }

  async cancelBooking(bookingData){

     return await ReservationSystems.manageCancellations(bookingData);

  }

  async notifyUser(io,resData){

     return await RealTimeUpdates.sendNotification(io,resData);

  }

  async getNotification(notifyData){
    
     return RealTimeUpdates.getStationAvailability(notifyData);

  }

}

export default new User();
