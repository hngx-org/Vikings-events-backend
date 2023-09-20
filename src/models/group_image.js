const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/config')

class GroupImage extends Model {}

GroupImage.init(
  {
    comment_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Comments',
        key: 'id',
      },
    },
    image_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Images',
        key: 'id',
      },
    },
  },

  {
    sequelize,
    modelName: 'GroupImage',
    tableName: 'group_image',
    timestamps: false,
  }
)

module.exports = GroupImage
