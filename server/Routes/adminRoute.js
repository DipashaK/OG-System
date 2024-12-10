const express = require("express");
const Donor = require("../Models/donation");
const Reciever = require("../Models/receiver");
const authenticateAdmin = require("../Middleware/authenticateAdmin");
const router = express.Router();
const { authenticate } = require("../Middleware/authenticate");

router.get("/", authenticateAdmin, async (req, res) => {
  try {
    console.log("User ID:", req.user.userId);
    const donors = await Donor.find();

    if (donors.length === 0) {
      console.log("No donors found.");
    }
    console.log("Donors:", donors);
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/r", authenticateAdmin, async (req, res) => {
  try {
    console.log("User ID:", req.user.userId);

    const recievers = await Reciever.find();

    if (recievers.length === 0) {
      console.log("No Reciever found.");
    }

    console.log("Reciever:", recievers);

    res.json(recievers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete Donor Route
router.delete("/api/donor/:id", authenticate, async (req, res) => {
  try {
    const donorId = req.params.id;
    const deletedDonor = await Donor.findByIdAndDelete(donorId);

    if (!deletedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json({ message: "Donor deleted successfully", donor: deletedDonor });
  } catch (error) {
    console.error("Error deleting donation:", error);
    res.status(500).json({ message: "Error deleting donation", error: error.message });
  }
});

// Delete Receiver Route
router.delete("/api/reciever/:id", authenticate, async (req, res) => {
  try {
    const recieverId = req.params.id;
    const deletedReciever = await Reciever.findByIdAndDelete(recieverId);

    if (!deletedReciever) {
      return res.status(404).json({ message: "Reciever not found" });
    }

    res.status(200).json({ message: "Reciever deleted successfully", donor: deletedReciever });
  } catch (error) {
    console.error("Error deleting reciever:", error);
    res.status(500).json({ message: "Error deleting reciever", error: error.message });
  }
});

// Edit Donor Route
router.put("/api/donor/:id", authenticate, async (req, res) => {
  try {
    const donorId = req.params.id;
    const updatedDonorData = req.body; // Get updated donor data from the request body

    const updatedDonor = await Donor.findByIdAndUpdate(donorId, updatedDonorData, { new: true });

    if (!updatedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json({ message: "Donor updated successfully", donor: updatedDonor });
  } catch (error) {
    console.error("Error updating donor:", error);
    res.status(500).json({ message: "Error updating donor", error: error.message });
  }
});

// Edit Receiver Route
router.put("/api/reciever/:id", authenticate, async (req, res) => {
  try {
    const recieverId = req.params.id;
    const updatedReceiverData = req.body; // Get updated receiver data from the request body

    const updatedReceiver = await Reciever.findByIdAndUpdate(recieverId, updatedReceiverData, { new: true });

    if (!updatedReceiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    res.status(200).json({ message: "Receiver updated successfully", receiver: updatedReceiver });
  } catch (error) {
    console.error("Error updating receiver:", error);
    res.status(500).json({ message: "Error updating receiver", error: error.message });
  }
});

module.exports = router;
