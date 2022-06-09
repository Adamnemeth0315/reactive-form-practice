const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');

const UserSchema = mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
  },
  active: Boolean,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
},
  password: {
    type: String,
    required: true,
  },
  rememberMe: Boolean,
}, {
  timestamps: true
});

UserSchema.plugin(bcrypt);

module.exports = mongoose.model('User', UserSchema);