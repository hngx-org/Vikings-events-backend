// set up multer
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const storage = multer.diskStorage({
  fileFilter,
  destination(req, file, cb) {
    // console.log(file);
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
    // change the file name to the user id + the file name
    // cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = {
  upload,
};
