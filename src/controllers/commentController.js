const Comment = require('../models/comments');

async function unlikeComment(req, res) {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id; 

    const existingLike = await CommentLike.findOne({
      where: { user_id: userId, comment_id: commentId },
    });

    if (!existingLike) {
      return res.status(400).json({ message: 'You have not liked this comment.' });
    }

    await CommentLike.destroy({ where: { user_id: userId, comment_id: commentId } });

    await Comment.decrement('likes', { by: 1, where: { id: commentId } });

    return res.status(200).json({ message: 'Comment unliked successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { unlikeComment };
