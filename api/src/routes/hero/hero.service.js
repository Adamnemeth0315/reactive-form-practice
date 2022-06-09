const Hero = require('../../models/hero.model');
const fileModel = require('../../models/file.model');

exports.create = async heroData => {
    const hero = new Hero(heroData);
    return await hero.save();
};

exports.findAll = () => Hero.find();

exports.findOne = id => Hero.findById(id);

exports.update = (id, updateData) => Hero.findByIdAndUpdate(id, updateData, {new: true}).populate({ path: 'image', model: fileModel });


exports.delete = id => Hero.findByIdAndDelete(id);