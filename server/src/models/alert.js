const mongoose = require('mongoose');
const { emailValidation } = require('../utils');
const validateFrequency = require('../services/validateFrequency');

const alertSchema = new mongoose.Schema({
  searchPhrase: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5,
    unique: true,
  },
  frequency: {
    type: String,
    required: true,
    validate: [validateFrequency, '{PATH} invalid.']
  },
  email: {
    type: String,
    required: true,
    validate: [emailValidation, '{PATH} invalid.']
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

module.exports = mongoose.model('Alert', alertSchema);