const express = require('express');
const {
  createComment,
  likeComment,
  // addCommentImage,
} = require('../controllers/commentController');
const { verify, isUserAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// router.use(verify)

router.get('/');

// Create a comment
router.post('/', verify, createComment);

// Like a comment
router.post('/:commentId/like', verify, likeComment);

// router.post('/:commentId/image', addCommentImage);

module.exports = router;
