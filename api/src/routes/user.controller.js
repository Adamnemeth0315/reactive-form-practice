const createError = require('http-errors');
const userService = require('./user.service');
const addressService = require('./address/address.service');

exports.findAll = (_req, res, _next) => {
  return userService.findAll()
      .then( users => {
          res.json(users);
      });
}

exports.findOne = (req, res, next) => {
  return userService.findOne(req.params.id)
    .then( user => {
      if (!user) {
        return next( new createError.NotFound("User is not found!"));
      }
      res.json(user);
    })
};

exports.create = async(req, res, next) => {

    const {username, email, password, rememberMe} = req.body;
    if (!username || !email || !password) {
      return next(
        new createError.BadRequest('Missing properties!')
    );
    }

    const newAddress = await addressService.create(req.body.address);

    if(!newAddress) {
        return next( 
            new createError.InternalServerError('Address created failed. ')
        );
    }

    const newUser = {
      username,
      email,
      address: newAddress._id,
      password,
      rememberMe, 
  };

    return userService.create(newUser)
    .then(createdUser => {
      res.status(201);
      res.json(createdUser);
    })
    .catch(err => next(new createError.InternalServerError(err.message)));
  }
  