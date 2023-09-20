const CommentImages = require('../models/comment_images');
const Images = require('../models/images')

const getGroups = async (req, res) => {
  const groups = 'All Groups';
  res.json({ groups });
};

const getCommentImages = async (req, res) => {
  const { comment_id } = req.body;

  if(!comment_id) {
    return res.status(400).json({ message: "`comment_id` is not defined" })
  }

  try {
    const commentImages = await CommentImages.findAll({
      where: {
        comment_id
      }
    });
    const imageIds = commentImages.map((comment_image) => {
      return comment_image.image_id;
    })

    const imagePromises = imageIds.map(async (image_id) => {
      return await Images.findByPk(image_id)
    })

    const imagesResult = await Promise.allSettled(imagePromises)
    const images = imagesResult.map((image) => {
      return image.url
    });
    return res.json({ images })

  } catch (e) {
    return res.status(500).json({ message: "Internal server error" })
  }
  
}

module.exports = { getGroups, getCommentImages  };
