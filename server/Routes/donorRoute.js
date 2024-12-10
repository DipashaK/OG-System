const express = require('express');
const router = express.Router();
const Donation = require('../Models/donation');
const { authenticate } = require('../Middleware/authenticate'); // Assuming authenticate middleware is in a separate file

// POST: Add new donation
router.post('/', authenticate, async (req, res) => {
  try {
    const { donorName, phone, email, gender, organ, bloodGroup } = req.body;
    const userId = req.user.userId;  // Extract the user ID from the JWT token

    const newDonation = new Donation({
      donorName,
      phone,
      email,
      gender,
      organ,
      bloodGroup,
      userId,  // Save the userId in the donation record
    });

    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error adding donation', error: err.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    console.log('User ID:', req.user.userId);  // Log user ID to verify it's correct
    const donations = await Donation.find({ userId: req.user.userId });

    if (donations.length === 0) {
      console.log('No donations found for this user.');
    }

    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// DELETE: Delete donation by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    // Ensure that the donation belongs to the authenticated user
    if (!donation || donation.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this donation' });
    }

    // Use findByIdAndDelete instead of remove
    await Donation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting donation', error: err.message });
  }
});


// PUT: Update donation by ID
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedData = req.body;
    const donation = await Donation.findById(req.params.id);
    
    // Ensure that the donation belongs to the authenticated user
    if (!donation || donation.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to update this donation' });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedDonation);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating donation', error: err.message });
  }
});

// PUT: Match donor with receiver (assuming matching logic)
router.put('/match/:donorId', authenticate, async (req, res) => {
  const { receiverId } = req.body;

  try {
    const donor = await Donation.findByIdAndUpdate(req.params.donorId, { matchedWith: receiverId }, { new: true });
    res.json({ donor });
  } catch (error) {
    res.status(500).json({ message: "Error matching donor." });
  }
});

module.exports = router;