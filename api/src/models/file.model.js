const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
  originalname: {
    type: String,
    required: true,
  },
  filename: String,
  destination: String,
  path: String,
  size: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  url: String,
  mimetype: {
    type: String,
    required: true,
  }
}, {
  timeStamps: true
});

module.exports = mongoose.model('File', FileSchema);