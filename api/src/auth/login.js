const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports = async (req, res) => {
  const {email, password, rememberMe} = req.body;

  try {
    const user = await UserModel.findOne({email});
    if (!user) {
      throw new Error('Felhasználó nem található!');
    }

    const verified = await user.verifyPassword(password);
    if (!verified) {
      throw new Error('Hibás jelszó!');
    }
    
    const accessToken = jwt.sign({
      email: email,
      rememberMe: rememberMe,
    }, process.env.ACCESS_TOKEN_SECRET);
    
    res.json({
      user,
      accessToken
    });
  } catch(error) {
    res.status(404).json(error.message);
  }
};
