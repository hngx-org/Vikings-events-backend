const cloudinary = require('cloudinary');

exports.cloudConfig = (req, res, next) => {
  cloudinary.config({
    cloud_name: 'ol4juwon',
    api_key: '619781942963636',
    api_secret: '8ZuIWrywiz5m6_6mLq_AYuHDeUo',
  });
  next();
};
