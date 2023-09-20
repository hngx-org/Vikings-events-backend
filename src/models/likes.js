const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/config')

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
      type: DataTypes.INTEGER,
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
  }
)

module.exports = Likes
