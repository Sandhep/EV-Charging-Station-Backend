// models/index.js
import { Sequelize, DataTypes } from "sequelize";
import User from "./User.js";
import Booking from "./Booking.js";
import Charger from "./Charger.js";
import ChargingSession from "./ChargingSession.js";
import ChargingStation from "./ChargingStation.js";
import Payment from "./Payment.js";
import Vehicle from "./Vehicle.js";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    /*
    dialectOptions: {
       ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    */
    logging: console.log,
  }
);

// Initialize models
const db = {
  User: User(sequelize, DataTypes),
  Vehicle:Vehicle(sequelize, DataTypes),
  Payment:Payment(sequelize, DataTypes),
  Booking:Booking(sequelize, DataTypes),
  Charger:Charger(sequelize, DataTypes),
  ChargingSession:ChargingSession(sequelize, DataTypes),
  ChargingStation:ChargingStation(sequelize, DataTypes),
  sequelize,
  Sequelize,
};

export default db;
