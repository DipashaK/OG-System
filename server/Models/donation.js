const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },
  email: { type: String, required: true, match: /^[a-zA-Z0-9._%+-]+@gmail\.com$/ },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  organ: { type: String, required: true },
  bloodGroup: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  status: { type: String, default: "Pending" },
  matchedWith: { type: mongoose.Schema.Types.ObjectId, ref: 'Receiver' },
});

module.exports = mongoose.model('Donation', donationSchema);
