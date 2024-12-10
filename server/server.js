const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require('./Middleware/db');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config(); 
const User = require('./Models/userModel');
const donationRoutes = require('./Routes/donorRoute');
const receiverRoutes = require('./Routes/receiverRoute');
const transplantRoutes = require('./Routes/transplantRoute');
const matchRoutes = require('./Routes/matchingRoute'); 
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;  
const {authenticate} = require('./Middleware/authenticate');
const adminRoutes = require('./Routes/adminRoute');

const app = express();

app.use(cors()); 

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use('/api/donor', donationRoutes);
// app.use('/api/receiver', receiverRoutes);
app.use('/api/transplant', transplantRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/receiver', authenticate, receiverRoutes);


// app.use('/api/donor', (req, res, next) => {
//   console.log('Authorization header:', req.headers['authorization']);
//   next();
// });


connectDb();

app.get('/protected-route', authenticate, (req, res) => {
  res.send('Protected content');
});


app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, emailId, password } = req.body;
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      emailId,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response body
    res.json({
      message: "Login successful",
      token: token, // Send the token here
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/api/user-data", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Access userId from token payload
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Send user data to the client
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});