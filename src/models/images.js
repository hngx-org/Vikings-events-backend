const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/config')

class Images extends Model {}

Images.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
