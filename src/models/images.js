const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Images extends Model {}

Images.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    comment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Comments',
        key: 'id',
      },
    },
    image_url: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Images',
    tableName: 'images',
    timestamps: false,
  }
);

module.exports = Images;
