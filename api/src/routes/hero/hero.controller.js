const createError = require('http-errors');
const Model = require('../../models/hero.model');
const heroService = require('./hero.service');
const fileService = require('../file/file.service');
const fileModel = require('../../models/file.model');

exports.findAll = (_req, res, _next) => {
  return heroService.findAll()
    .populate({ path: 'image', model: fileModel })
    .then( heroes => {
        res.json(heroes);
    });
}


exports.findOne = (req, res, next) => {
  return heroService.findOne(req.params.id)
    .then( hero => {
      if (!hero) {
        return next( new createError.NotFound("hero is not found!"));
      }
      res.json(hero);
    })
};

exports.create = async(req, res, next) => {
    const {name, level, description, superpower, image} = req.body;
    if (!name | !description | !level) {
      return next(
        new createError.BadRequest(validationsErrors)
      );
    }

    const newHero = {
      name,
      level,
      description,
      superpower,
    }
    //Ha van image akkor hozzáadom a herohoz, ha nincs akkor kép nélkül hozza létre. 
    if(image) {
      newHero.image = image;
    }

    return heroService.create(newHero)
    .then(createdHero => {
    res.status(201).json(createdHero);
    })
    .catch(err => next(new createError.InternalServerError(err.message)));
  }

  exports.update = async (req, res, next) => {
    
    const validationErrors = new Model(req.body).validateSync();
    if (validationErrors) {
        return next(
            new createError.BadRequest(validationErrors)
        );
    }

    return heroService.update(req.params.id, req.body)
        .then(hero => {
            res.json(hero);
        })
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
  return heroService.delete(req.params.id)
    .then( () => res.json({}))
    .catch ( err => {
      return next ( new createError.InternalServerError(err.message));
    });
};
