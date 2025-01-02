import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import cors
import User from './UtilityClasses/User.js';
import authenticateToken from './middleware/authenticateToken.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',  // Only allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  //allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

app.use(cors(corsOptions));  // Apply CORS options

// Register a new user
app.post('/api/register', async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  console.log(req.body);

  try {
    const newUser = await User.register({ name, email, phoneNumber, password });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login a user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.login({ email, password });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch user's profile
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.getProfile(req.user.userID);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Experimental code base 👇

app.get('/user', async (req,res)=>{
  const user = new User(req.body.name,req.body.email);
  user.getuserdetails();
  user.findStations();
  res.send("Allowed");
})

app.get('/stationfinder',async(req,res)=>{
  const user = new User(req.body.name,req.body.email);
  var data = user.findStations(req.body.filter);
  res.send(data);
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
