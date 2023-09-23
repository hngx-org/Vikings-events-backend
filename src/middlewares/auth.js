/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

exports.isUserAuthenticated = (req, res, next) => {
  console.log('req.user:', req.user);
  if (req.user) {
    next();
  } else {
    return res.status(401).send('You must login first!');
  }
};

exports.verify = async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'failed to authorize' });
      }
      req.user = decoded;
      return next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided',
    });
  }
};

exports.signToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: 24 * 60 * 60 * 1000 * 5,
  });
  return token;
};
