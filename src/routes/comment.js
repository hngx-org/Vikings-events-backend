const express = require('express');

const multer = require('multer');

let storage = multer.memoryStorage();
let uploads = multer({ storage }).array('images', 5);

const { verify } = require('../middlewares/auth');
const { cloudConfig } = require('../middlewares/cloudinary');

const router = express.Router();
const {
  createComment,
  likeComment,
  unlikeComment,
  addCommentImage,
  getCommentImages,
} = require('../controllers/commentController');

// router.use(verify)

router.get('/');

// Create a comment
router.post('/:eventId', uploads, verify, cloudConfig, createComment);

<<<<<<< HEAD
// Get all the images for a comment
=======
//Get all the images for a comment
>>>>>>> ac63d5d643a81fd59c40d177d566d3e9945d1481
router.get('/:commentId/images', getCommentImages);

// Like a comment
router.post('/:commentId/like', verify, likeComment);

//unlike comment
router.delete('/:commentId/members/:userId/unlike', verify, unlikeComment);

// router.post('/:commentId/image', addCommentImage);

module.exports = router;
