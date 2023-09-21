const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Unlike a comment
router.delete('/comments/:commentId/unlike', commentController.unlikeComment);

module.exports = router;
