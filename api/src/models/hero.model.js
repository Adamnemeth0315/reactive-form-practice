const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  }, 
  superpower: {
    type: String,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  description: String,
  image: String
},{
  timestamps: true
});

module.exports = mongoose.model('Hero', HeroSchema)