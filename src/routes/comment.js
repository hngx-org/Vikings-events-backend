const express = require('express');
const {
  createComment,
  likeComment,
  addCommentImage,
} = require('../controllers/commentController');

const router = express.Router();

router.get('/');

// Create a comment
router.post('/', createComment);

// Like a comment
router.post('/:commentId/members/:userId/like', likeComment);

router.post('/:commentId/image', addCommentImage);

module.exports = router;
