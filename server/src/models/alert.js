const mongoose = require('mongoose');
const { emailValidation } = require('../utils');
const { FREQUENCY_TYPES } = require('../utils/constants');

const alertSchema = new mongoose.Schema({
  searchPhrase: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5,
  },
  frequency: {
    type: String,
    enum: FREQUENCY_TYPES,
    required: true,
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