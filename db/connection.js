import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env

import pkg from 'pg';
const { Client } = pkg;

// Database connection setup
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Connect to the database
client.connect().catch(err => {
    console.error('Failed to connect to the database:', err.stack);
});

export default client;
