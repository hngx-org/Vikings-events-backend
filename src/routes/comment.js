const express = require('express');

const { verify, isUserAuthenticated } = require('../middlewares/auth');
const router = express.Router();
const {createComment, likeComment, unlikeComment,addCommentImage, getCommentImages} = require('../controllers/commentController');



// router.use(verify)



router.get('/');

// Create a comment
router.post('/', verify, createComment);

//Get all the images for a comment
router.get('/:commentId/images', getCommentImages)

// Like a comment
router.post('/:commentId/like', verify, likeComment);

//unlike comment
router.delete('/:commentId/members/:userId/unlike', unlikeComment);

// router.post('/:commentId/image', addCommentImage);


module.exports = router;
