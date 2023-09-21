const CommentImages = require('../models/comment_images');
const Comments = require('../models/comments');
const Events = require('../models/events');
const Images = require('../models/images');
const Likes = require('../models/likes');
const User = require('../models/users');

// eslint-disable-next-line consistent-return
const getComments = async (req, res) => {
  // We first check if the event exist
  const event = await Events.findByPk(req.params.eventId);

  if (!event) {
    return res.status(500).send({ error: 'Event Not found' });
  }

  try {
    // const event_id = event.dataValues.id;

    const comments = await Comments.findAll({
      include: Images,
    });

    // const comments = await Comments.findAll({
    //   where: {
    //     event_id: eventId,
    //   },
    //   include: { model: Images },
    // });

    return res.send(comments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
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
