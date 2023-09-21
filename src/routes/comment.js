const express = require('express');
const {
  createComment,
  likeComment,
  getCommentImages
} = require('../controllers/commentController');

const router = express.Router();




router.get('/');

// Create a comment
router.post('/', createComment);

//Get all the images for a comment
router.get('/:commentId/images', getCommentImages)

// Like a comment
router.post('/:commentId/members/:userId/like', likeComment);

module.exports = router;
