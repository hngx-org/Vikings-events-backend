const Comments = require('../models/comments');
const Events = require('../models/events');
const User = require('../models/users');

const getGroups = async (req, res) => {
  const groups = 'All Groups';
  res.json({ groups });
};

// eslint-disable-next-line consistent-return
const getComments = async (req, res) => {
  // We first check if the event exist
  const event = await Events.findByPk(req.params.eventId);

  if (!event) {
    return res.status(500).send({ error: 'Event Not found' });
  }

  try {
    // We find all the comments where that is related to the event
    // and we also include the user and event full details

    // Todo: Also include the comment images, but there is a problem with
    // the table for a comment_images table the table does not have a comment_id

    const comments = await Comments.findAll({
      where: {
        event_id: req.params.eventId,
      },
      limit: 10,
      include: [User, Events],
    });

    return res.send(comments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getGroups, getComments };

module.exports = { getGroups };
