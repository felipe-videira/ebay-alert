const mongoose = require('mongoose');

const frequencySchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 1,
    unique: true
  },
  label: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 1,
    unique: true
  },
  deleted: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString()
  },
  lastModifiedAt: {
    type: Date,
    default: new Date().toISOString()
  }
});

module.exports = mongoose.model('Frequency', frequencySchema);