const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const port = 3000;
mongoose.Promise = global.Promise;
const app = express();

app.use(express.json());
app.use(cors());

mongoURI = 'mongodb://dbuser:userpw@localhost:27017/admin';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connection has been established successfully.'))
  .catch(err => {
    console.error(err);
    process.exit();
  });


app.post('/login', require('./auth/login'));
app.use('/register', require('./routes/user.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/heroes', require('./routes/hero/hero.routes'));
app.use('/single', require('./routes/file/file.routes'));
app.use('/new-hero', require('./routes/hero/hero.routes'));
app.use('/files', express.static(path.join(__dirname, 'files')));


app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res
    .status(status)
    .json({
      hasError: true,
      message: err.message
    });
})

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

