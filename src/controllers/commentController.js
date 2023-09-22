const Comments = require('../models/comments');
const Likes = require('../models/likes');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
cloudinary.config({
  cloud_name: 'ol4juwon',
  api_key: '619781942963636',
  api_secret: '8ZuIWrywiz5m6_6mLq_AYuHDeUo',
});
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

const addCommentImage = async (req, res) => {
  try {
    console.log("error");
    const { commentId } = req.params;
    const files = req.file;
    console.log({files});
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log({result});
    return res.status(200).json({data: {url: ""}})
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: 'An internal error occurred while  uploading image' });
  }
};

module.exports = {
  getComments, likeComment, createComment, addCommentImage,
};
