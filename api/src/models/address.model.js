const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    zip: Number,
    country: String,
    city: String,
    street: String,
    houseNumber: Number
  }, {
    timeStamps: true
});

module.exports = mongoose.model('Address', AddressSchema);