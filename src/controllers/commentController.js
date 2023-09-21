const Comments = require('../models/comments');
const Likes = require('../models/likes');

const getComments = async (req, res) => {
  const comments = 'All comments';
  res.json({ comments });
};

const createComment = async (req, res) => {};

const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    // const { userId } = req.user;
    const { userId } = req.params;

    //  Check if the user has already liked the comment
    const existingLike = await Likes.findOne({
      where: { user_id: userId, comment_id: commentId },
    });

    if (existingLike) {
      return res
        .status(400)
        .json({ error: 'User has already liked the comment' });
    }

    // Create a new like record
    await Likes.create({ user_id: userId, comment_id: commentId });

    res.json({ message: 'Comment liked successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An internal error occurred while liking the comment' });
  }
};

module.exports = { getComments, likeComment, createComment };
