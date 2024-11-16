import express from 'express';
import dotenv from 'dotenv';
import User from './UtilityClasses/User.js';
import authenticateToken from './middleware/authenticateToken.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Register a new user
app.post('/api/register', async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

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
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
