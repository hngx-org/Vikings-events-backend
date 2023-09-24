const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const Groups = require('./2-groups');
const Images = require('./4-images');

class GroupImage extends Model {}

GroupImage.init(
  {
    group_id: {
      type: DataTypes.UUID,
      references: {
        model: Groups,
        key: 'id',
      },
    },
    image_id: {
      type: DataTypes.UUID,
      references: {
        model: Images,
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

GroupImage.removeAttribute('id');

module.exports = GroupImage;
