const multer = require('multer');
const path = require('path');

const storageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../files'))
  }, 
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }
});

const upload = multer({
  storage: storageEngine,
  filesFilter(_req, file, cb) {
    if(
      file.mimetype == "image/png"
      || file.mimetype == "image/jpeg"
    ) {
      cb(null ,true)
    } else {
      cb(null, false)
      return cb(new Error('Only .jpg and png format allowed!'));
    }
  }
}).single('file');

module.exports = {
  upload,
}