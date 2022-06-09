const createError = require('http-errors');
const filesService = require('./file.service');
const File = require('../../models/file.model');
const { upload } = require('./file.middleware');
const { unlink } = require('fs');
const path = require('path');
const multer = require('multer');

exports.uploadFile = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) return res.send(err);
    console.log(req.file);
    const url = `http://localhost:3000/files/${req.file.filename}`; //Ehhez kell az express static az index.js file-ban hogy működjön. 
    
    const file = new File({ ...req.file, url});
    
    file.save().then(createdFile => {
      console.log(createdFile);
      res.status(201).json(createdFile);
    })
    .catch( err => {
      next( new createError.InternalServerError(err.message));
    })
  });
}

exports.delete = (req, res, next) => {
  unlink(path.join(__dirname, `../../files/${req.params.filename}`), err => {
    if (err) throw err;
    return filesService.delete(req.params.filename)
    .then( () => {
      res.json({});
    })
    .catch( err => {
      return next( new createError.InternalServerError(err.message));
    })
  });
}
