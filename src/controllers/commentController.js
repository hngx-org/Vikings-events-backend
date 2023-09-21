const CommentImages = require('../models/comment_images');
const Images = require('../models/images');
const Comments = require('../models/comments');
const Likes = require('../models/likes');


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


module.exports = { getComments, getCommentImages, likeComment, createComment };
