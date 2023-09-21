const express = require('express');
const {
  createComment,
  likeComment,
} = require('../controllers/commentController');

const router = express.Router();

router.get('/');

// Create a comment
router.post('/', createComment);

// Like a comment
router.post('/:commentId/members/:userId/like', likeComment);

module.exports = router;
