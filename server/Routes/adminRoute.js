const express = require("express");
const Donor = require("../Models/donation");
const Reciever = require("../Models/receiver")
const authenticateAdmin = require("../Middleware/authenticateAdmin");
const router = express.Router();

router.get('/', authenticateAdmin, async (req, res) => {
  try {
    console.log('User ID:', req.user.userId); 
    const donors = await Donor.find(); 

    if (donors.length === 0) {
      console.log('No donors found.');
    }
    console.log('Donors:', donors);
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/r', authenticateAdmin, async (req, res) => {
  try {
    console.log('User ID:', req.user.userId); 

    const recievers = await Reciever.find();  

    if (recievers.length === 0) {
      console.log('No Reciever found.');
    }

    console.log('Reciever:', recievers);

    res.json(recievers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;