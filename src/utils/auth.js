const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h', // Set the token expiration time as needed
  });
}

module.exports = generateToken;
