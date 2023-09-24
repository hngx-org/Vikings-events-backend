const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

const Comments = require('./5-comments');
const Images = require('./4-images');

class CommentImages extends Model {}

CommentImages.init(
  {
    comment_id: {
      type: DataTypes.UUID,
      references: {
        model: Comments,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    image_id: {
      type: DataTypes.UUID,
      references: {
        model: Images,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },

  {
    sequelize,
    modelName: 'CommentImages',
    tableName: 'comment_images',
    timestamps: false,
  },
);

// CommentImages.removeAttribute('id');

module.exports = CommentImages;
