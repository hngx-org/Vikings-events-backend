const Comments = require('../models/comments.js');

async function commentController(req, res) {
  try {
    const { body, user_id, event_id } = req.body;

    const comment = { body, user_id, event_id };

    const newComment = await Comments.create(comment);

    await newComment.save();

    res.send({ msg: 'Comment created', newComment });
  } catch (error) {
    console.log(error, 'error');
    res.send(error, 'error');
  }
}

module.exports = { commentController };
