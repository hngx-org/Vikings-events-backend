const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class Likes extends Model {}

Likes.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comments',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.TEXT,
      references: {
        model: 'User',
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
