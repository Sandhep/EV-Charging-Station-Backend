import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import cors
import User from './service/User.js';
import authenticateToken from './middleware/authenticateToken.js';
import router from './route/route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

const corsOptions = {
  origin: ['*'],  // Change it later to allow requests only from origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  //allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

app.use(cors(corsOptions));  // Apply CORS options

app.use('/api',router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
