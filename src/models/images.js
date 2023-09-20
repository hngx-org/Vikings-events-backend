const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/config')

class Images extends Model {}

Images.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Images',
    tableName: 'images',
    timestamps: false,
  }
)

module.exports = Images
