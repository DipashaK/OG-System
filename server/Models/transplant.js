const mongoose = require('mongoose');

const transplantSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  organ: { type: String, required: true },
  recipient: { type: String, required: true },
  location: { type: String, required: true },
});

const Transplant = mongoose.model('Transplant', transplantSchema);

module.exports = Transplant;
