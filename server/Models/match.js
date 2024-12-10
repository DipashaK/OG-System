// models/Match.js
const mongoose = require('mongoose');

// Define the schema for the matched pairs
const matchSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',  // Assuming you have a 'Donor' model
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receiver',  // Assuming you have a 'Receiver' model
    required: true,
  },
  matchDate: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
