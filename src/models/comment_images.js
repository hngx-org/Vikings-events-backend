const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/config')

class CommentImages extends Model {}

CommentImages.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comments',
        key: 'id',
      },
    },
    image_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Images',
        key: 'id',
      },
    },
  },

  {
    sequelize,
    modelName: 'CommentImages',
    tableName: 'comments_images',
    timestamps: false,
  }
)

module.exports = CommentImages
