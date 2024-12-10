const express = require('express');
const router = express.Router();
const Donation = require('../Models/donation');
const Receiver = require('../Models/receiver');

// Endpoint to find matching donors
router.post('/findMatches', async (req, res) => {
  try {
    const { organ, bloodGroup } = req.body;

    // Find donors with the requested organ and matching blood group
    const matchedDonors = await Donation.find({
      organ: organ,
      bloodGroup: bloodGroup
    });

    // Find receivers with the same organ and blood group and pending status
    const matchedReceivers = await Receiver.find({
      organ: organ,
      bloodGroup: bloodGroup,
      status: 'pending'
    });

    // If no donors or receivers are found
    if (matchedDonors.length === 0 || matchedReceivers.length === 0) {
      return res.status(404).json({ message: 'No matches found' });
    }

    // Return the matched donors and receivers
    res.status(200).json({
      message: 'Matches found',
      matchedDonors: matchedDonors,
      matchedReceivers: matchedReceivers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
