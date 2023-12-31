const sequelize = require('../config/config');
const CommentImages = require('../models/comment_images');
const Comments = require('../models/5-comments');
const Events = require('../models/3-events');
const Images = require('../models/4-images');
const Likes = require('../models/likes');
const User = require('../models/1-users');
const EventThumbnail = require('../models/event_thumbnail');

const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
const { upload } = require('../services/cloudinary');

// cloudinary.config({
//   cloud_name: 'ol4juwon',
//   api_key: '619781942963636',
//   api_secret: '8ZuIWrywiz5m6_6mLq_AYuHDeUo',
// });

const getCommentImages = async (req, res) => {
  const commentId = Number(req.params.commentId);

  if (!commentId) {
    return res.status(400).json({ message: '`commentId` is not defined' });
  }

  try {
    const commentImages = await CommentImages.findAll({
      where: {
        comment_id: commentId,
      },
    });

    if (commentImages.length === 0) {
      return res.json({ images: [] });
    }
    const imageIds = commentImages.map(
      (comment_image) => comment_image.image_id,
    );

    const imagePromises = imageIds.map(
      async (image_id) =>
        await Images.findOne({
          where: {
            id: image_id,
          },
        }),
    );

    const imagesResult = await Promise.allSettled(imagePromises);

    const images = imagesResult.map((image) => image.value.url);
    return res.json({ images });
  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// eslint-disable-next-line consistent-return

const getComments = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const comments = await Comments.findAll({
      where: { event_id: eventId },
      include: [User, Images, Events],
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

    return res.status(200).json({
      comments,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { eventId } = req.params;
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

    // upload image if exist

    let urls = null;

    if (req.files) {
      // upload the images
      urls = await upload(req.files);
    }

    const comment = await Comments.create({
      body,
      user_id: userId,
      event_id: eventId,
    });

    // create the comment image
    if (urls && urls.length >= 1) {
      const imageIDs = [];

      // loop to create images
      for (const url of urls) {
        const image = await Images.create({ url });
        imageIDs.push(image.id);
      }

      // loop to create image comment association
      for (const imageID of imageIDs) {
        CommentImages.create({
          comment_id: comment.dataValues.id,
          image_id: imageID,
        });
      }
    }

    return res
      .status(201)
      .json({ message: 'Comment created successfully', comment, images: urls });
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
    // const userId = req.user.id;
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

    // find comment
    const comment = await Comments.findOne({
      where: { id: commentId },
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

    const response = {
      comment: {
        id: commentId,
        likesCount: comment.dataValues.likesCount,
      },
      message: 'Comment liked',
      status: 'success',
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An internal error occurred while liking the comment' });
  }
};

const unlikeComment = async (req, res) => {
  try {
    const { commentId, userId } = req.params;

    const existingLike = await Likes.findOne({
      where: { user_id: userId, comment_id: commentId },
    });

    if (!existingLike) {
      return res
        .status(400)
        .json({ message: 'You have not liked this comment.' });
    }

    await Likes.destroy({ where: { user_id: userId, comment_id: commentId } });

    const comment = await Comments.findOne({
      where: { id: commentId },
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

    const response = {
      comment: {
        id: commentId,
        likesCount: comment.dataValues.likesCount,
      },
      message: 'Comment unliked',
      status: 'success',
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    //  Check if the comment exists
    const comment = await Comments.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      return res
        .status(400)
        .json({ error: 'There is no comment available with this id' });
    }

    // Delete a comment
    await Comments.destroy({ where: { id: commentId } });

    const response = {
      comment: {
        id: commentId,
      },
      message: 'Comment deleted',
      status: 'success',
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An internal error occurred while deleting the comment' });
  }
};

module.exports = {
  getComments,
  getCommentImages,
  likeComment,
  unlikeComment,
  createComment,
  deleteComment,
};
