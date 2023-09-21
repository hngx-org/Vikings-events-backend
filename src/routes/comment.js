const express = require('express');
const router = express.Router();
const {createComment, likeComment, unlikeComment} = require('../controllers/commentController');



router.get('/');

// Create a comment
router.post('/', createComment);

// Like a comment
router.post('/:commentId/members/:userId/like', likeComment);

//unlike comment
router.delete('/:commentId/members/:userId/unlike', unlikeComment);

module.exports = router;
