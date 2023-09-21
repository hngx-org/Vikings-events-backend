const { Router } = require('express');

const { getCommentImages } = require('../controllers/commentController')

const router = Router()

//Get all the images for a comment
router.get('/:commentId/images', getCommentImages)


module.exports = router;