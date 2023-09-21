const CommentImages = require('../models/comment_images');
const Images = require('../models/images')

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

module.exports = { getGroups, getCommentImages  };
