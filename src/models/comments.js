const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    body: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
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
  }
);

module.exports = Comments;
