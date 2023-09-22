const express = require('express');
const {
  createComment,
  likeComment,
  // addCommentImage,
  getCommentImages
} = require('../controllers/commentController');
const { verify, isUserAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// router.use(verify)



router.get('/');

// Create a comment
router.post('/', verify, createComment);

//Get all the images for a comment
router.get('/:commentId/images', getCommentImages)

// Like a comment
router.post('/:commentId/like', verify, likeComment);

// router.post('/:commentId/image', addCommentImage);

module.exports = router;
