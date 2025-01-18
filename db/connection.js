import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env

import pg from 'pg';
const { Client } = pg;

// Database connection setup
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    keepAlive: true,
});

client.connect()
     .then(()=>{
        console.log("DB Connected successfully");
     })
     .catch(err=>{
        console.error("Failed to connect to the Database",err.stack);
     })

client.on('error', async (err) => {

    console.error('Database connection error:', err.stack);
    console.log('Attempting to reconnect...');
    try {
        await client.connect();
        console.log('Reconnected to the database.');
        } catch (reconnectErr) {
        console.error('Failed to reconnect:', reconnectErr.stack);
        }
    });

export default client;
