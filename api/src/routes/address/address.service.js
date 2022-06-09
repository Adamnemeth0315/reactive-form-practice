const Address = require('../../models/address.model');

exports.create = async addressData => {
    const address = new Address(addressData);
    return await address.save();
};

exports.findAll = () => Address.find();
/* 
exports.findOne = id => Address
    .findById(id)
    .populate('resident'); */

exports.delete = (id) => Address.findByIdAndRemove(id);