const sequelize = require('../config/config');
const CommentImages = require('../models/comment_images');
const Comments = require('../models/comments');
const Events = require('../models/events');
const Images = require('../models/images');
const Likes = require('../models/likes');
const User = require('../models/users');

const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: 'ol4juwon',
  api_key: '619781942963636',
  api_secret: '8ZuIWrywiz5m6_6mLq_AYuHDeUo',
});




const getGroups = async (req, res) => {
  const groups = 'All Groups';
  res.json({ groups });
};

const getCommentImages = async (req, res) => {
  const commentId  = Number(req.params.commentId);

  
  if(!commentId) {
    return res.status(400).json({ message: "`commentId` is not defined" })
  }

  try {
    const commentImages = await CommentImages.findAll({
      where: {
        comment_id: commentId
      }
    });

    if (commentImages.length === 0) {
      return res.json({ images: [] })
    }
    const imageIds = commentImages.map((comment_image) => {
      return comment_image.image_id;
    })

    const imagePromises = imageIds.map(async (image_id) => {
      return await Images.findOne({
        where: {
          id: image_id
        }
      })
    })

    const imagesResult = await Promise.allSettled(imagePromises)
    
    
    const images = imagesResult.map((image) => {
      return image.value.url
    });
    return res.json({ images })

  } catch (e) {
    return res.status(500).json({ message: "Internal server error" })
  }
  
}

// eslint-disable-next-line consistent-return

const getComments = async (req, res) => {
  // We first check if the event exist
  const event = await Events.findByPk(req.params.eventId);

  if (!event) {
    return res.status(500).send({ error: 'Event Not found' });
  }

  try {
    const eventId = event.dataValues.id;

    const comments = await Comments.findAll({
      where: { event_id: eventId },
      include: [User, Events, Images],
      attributes: {
        include: [
          [
            // Note the wrapping parentheses in the call below!
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM likes
                    WHERE
                    likes.comment_id = Comments.id
                )`),
            'likesCount',
          ],
        ],
      },
    });

    return res.send(comments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;
    const { body } = req.body;

    // Check if user id and event id are provided
    if (!eventId || !userId) {
      return res
        .status(400)
        .json({ error: 'Please provide event id and user id' });
    }

    // check if user exists
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    // Check if event exists
    const existingEvent = await Events.findOne({
      where: { id: eventId },
    });
    if (!existingEvent) {
      return res.status(400).json({ error: 'Event not found' });
    }

    const comment = await Comments.create({
      body,
      user_id: userId,
      event_id: eventId,
    });

    return res
      .status(201)
      .json({ message: 'Comment created successfully', comment });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'An error occurred while creating the comment' });
  }
};


const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

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

    res.json({ message: `Comment liked` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An internal error occurred while liking the comment' });
  }
};


module.exports = { getComments, getCommentImages, likeComment, createComment };
