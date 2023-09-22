const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class GroupImage extends Model {}

GroupImage.init(
  {
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups',
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
    modelName: 'GroupImage',
    tableName: 'group_image',
    timestamps: false,
  },
);

module.exports = GroupImage;
