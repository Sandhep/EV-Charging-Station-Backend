import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import router from './route/route.js';
import database from './repository/Database.js';

dotenv.config();

database.initialise();

const app = express();

app.use(cors()); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api',router);

export default app;
