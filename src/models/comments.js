const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./users');
const Events = require('./events');

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
      type: DataTypes.INTEGER,
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

// I would have added the relationship to the comment_images table
// but the comment_images table does not have a comment_id column

Comments.belongsTo(User, { foreignKey: 'user_id' });
Comments.belongsTo(Events, { foreignKey: 'event_id' });

module.exports = Comments;
