const createError = require('http-errors');
const addressService = require('./address.service');

exports.findAll = (_req, res, _next) => {
    return addressService.findAll()
        .then( address => {
            res.json(address);
        });
}

exports.findOne = (req, res, next) => {
    return addressService.findOne(req.params.id)
    .then(address => {
    if (!address) {
    return next(new createError.NotFound("Address is not found"));
    }
    
    res.json(address);
    })
    .catch(err => {
    if (err.kind === 'ObjectId') {
    return next(new createError.NotFound("Address is not found"));
    } else {
    return next(new createError.InternalServerError(err.message));
    }
    });
    }

exports.create = (req, res, next) => {
    if (!req.body.zip || !req.body.country || !req.body.city || !req.body.street || !req.body.houseNumber ) {
        return next(new createError.BadRequest("Request body must contain zip, city, street, houseNumber parameters"));
    }

    const addressData = {
        zip: req.body.zip,
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        houseNumber: req.body.houseNumber
        };
        
        return addressService.create(addressData)
        .then(createdAddress => {
        res.status(201);
        res.json(createdAddress);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
    }
