const express = require('express');

const multer = require('multer');

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array('images', 5);

const { verify } = require('../middlewares/auth');
const { cloudConfig } = require('../middlewares/cloudinary');

const router = express.Router();
const {
  createComment,
  likeComment,
  unlikeComment,
  addCommentImage,
  getCommentImages,
  getComments,
} = require('../controllers/commentController');

// router.use(verify)

router.get('/');

// Create a comment
router.post('/:eventId', uploads, verify, cloudConfig, createComment);

// Get all the images for a comment
router.get('/:eventId', verify, getComments);

// Like a comment
router.post('/:commentId/members/:userId/like', verify,likeComment);

// unlike comment
router.delete('/:commentId/members/:userId/unlike', verify, unlikeComment);

// router.post('/:commentId/image', addCommentImage);

module.exports = router;
