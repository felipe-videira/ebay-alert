const mongoose = require('mongoose');

const localeSchema = new mongoose.Schema({
  lng: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 1,
    unique: true
  },
  translation: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
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

module.exports = mongoose.model('Locale', localeSchema);