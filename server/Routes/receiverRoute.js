const express = require('express');
const router = express.Router();
const Reciever = require('../Models/receiver');
const { authenticate } = require('../Middleware/authenticate'); 
router.post('/', authenticate, async (req, res) => {
  try {
    const { receiverName, phone, email, gender, organ, bloodGroup } = req.body;

    if (!receiverName || !phone || !email || !organ || !bloodGroup) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const userId = req.user.userId; 

    const newReceiverRequest = new Reciever({
      receiverName,
      phone,
      email,
      gender,
      organ,
      bloodGroup,
      userId,  
      isReceiver: true,
    });

    await newReceiverRequest.save();
    res.status(201).json(newReceiverRequest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error adding receiver request', error: err.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    console.log('User ID:', req.user.userId);  
    const receiverRequests = await Reciever.find({ userId: req.user.userId });

    if (!receiverRequests || receiverRequests.length === 0) {
      return res.status(404).json({ message: 'No receiver requests found for this user.' });
    }

    res.json(receiverRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const receiverRequest = await Reciever.findById(req.params.id);

    if (!receiverRequest) {
      return res.status(404).json({ message: 'Receiver request not found' });
    }

    if (receiverRequest.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this receiver request' });
    }

    await Reciever.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Receiver request deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error deleting receiver request', error: err.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedData = req.body;
    const receiverRequest = await Reciever.findById(req.params.id);

    if (!receiverRequest) {
      return res.status(404).json({ message: 'Receiver request not found' });
    }

    if (receiverRequest.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to update this receiver request' });
    }

    const updatedReceiverRequest = await Reciever.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedReceiverRequest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating receiver request', error: err.message });
  }
});

router.put('/match/:receiverId', authenticate, async (req, res) => {
  const { donorId } = req.body;

  try {
    console.log('Matching receiver:', req.params.receiverId, 'with donor:', donorId); 

    const receiver = await Reciever.findByIdAndUpdate(req.params.receiverId, { matchedWith: donorId }, { new: true });
  
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }
    
    res.json({ receiver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error matching receiver with donor." });
  }
});

module.exports = router;
