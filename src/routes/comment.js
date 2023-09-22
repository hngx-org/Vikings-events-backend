const express = require('express');
const { verify, isUserAuthenticated } = require('../middlewares/auth');
const router = express.Router();
const {createComment, likeComment, unlikeComment} = require('../controllers/commentController');



// router.use(verify)

router.get('/');

// Create a comment
router.post('/', verify, createComment);

// Like a comment
router.post('/:commentId/like', verify, likeComment);

//unlike comment
router.delete('/:commentId/members/:userId/unlike', unlikeComment);

module.exports = router;
