const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./users');
const Events = require('./events');
const CommentImages = require('./comment_images');
const Images = require('./images');

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    body: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
    event_id: {
      type: DataTypes.UUID,
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
