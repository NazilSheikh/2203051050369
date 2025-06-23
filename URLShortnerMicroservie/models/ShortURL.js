const mongoose = require('mongoose');

const shortURLSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortcode: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('ShortURL', shortURLSchema);
