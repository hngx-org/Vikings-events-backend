const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./1-users');
const Comments = require('./5-comments');

class Likes extends Model {}

Likes.init(
  {
    comment_id: {
      type: DataTypes.UUID,
      references: {
        model: Comments,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
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
