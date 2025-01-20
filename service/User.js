import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//import db from '../db/connection.js'; // PostgreSQL client
import StationFinder from './userservice/StationFinder.js';
import ReservationSystems from './userservice/ReservationSystems.js';
import RealTimeUpdates from './userservice/RealTimeUpdates.js';
import UserModel from '../repository/models/User.js';

class User {

  // Register a new user
  async register({ name, email, phoneNumber, password }) {
    if (!name || !email || !phoneNumber || !password) {
      throw new Error('All fields are required');
    }

    // Check if the user already exists
    //const userExistsQuery = 'SELECT * FROM users WHERE "Email" = $1';
    //const userExists = await db.query(userExistsQuery, [email]);

    const userExists = await UserModel.findOne({
      where: {
        Email: email,
      },
    });
    

    if (userExists.rows.length > 0) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
   /* const insertUserQuery = `
      INSERT INTO users ("Name", "Email", "PhoneNumber", "PasswordHash", "Role", "LoyaltyPoints")
      VALUES ($1, $2, $3, $4, 'user', 0)
      RETURNING *;
    `;

      const newUser = await db.query(insertUserQuery, [
      name,
      email,
      phoneNumber,
      hashedPassword,
    ]);
   */
    const newUser = await UserModel.create({
      Name: name,
      Email: email,
      PhoneNumber: phoneNumber,
      PasswordHash:hashedPassword
    });
    
    return newUser.rows[0]; // Return the newly created user object
  }

  // Login a user
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find the user by email
   // const findUserQuery = 'SELECT * FROM users WHERE "Email" = $1';
    //const user = await db.query(findUserQuery, [email]);
    
    const user = await UserModel.findOne({
      where: {
        Email: email,
      },
    });
    
    if (user.rows.length === 0) {
      throw new Error('Invalid credentials');
    }

    const foundUser = user.rows[0];

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, foundUser.PasswordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userID: foundUser.UserID, email: foundUser.Email },
      process.env.JWT_SECRET || 'your_secret_key'
    );

    return { message: 'Login successful', token };
  }

  // Fetch a user's profile (protected by JWT)
  async getProfile(userID) {

    //const getUserQuery = 'SELECT * FROM users WHERE "UserID" = $1';
    //const user = await db.query(getUserQuery, [userID]);

    const user = await UserModel.findOne({
      where: {
        UserID: userID,
      },
    });
    

    if (user.rows.length === 0) {
      throw new Error('User not found');
    }

    return user.rows[0];
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
