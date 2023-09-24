const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./users');

class Likes extends Model {}

Likes.init(
  {
    comment_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Comments',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
  },

  {
    sequelize,
    modelName: 'Likes',
    tableName: 'likes',
    timestamps: false,
  },
);

// Remove the 'id' attribute from the UserGroup model
Likes.removeAttribute('id');

module.exports = Likes;
