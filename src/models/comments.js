const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./users');
const Events = require('./events');
const CommentImages = require('./comment_images');
const Images = require('./images');

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.TEXT,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Comments',
    tableName: 'comments',
    timestamps: false,
  },
);

module.exports = Comments;
