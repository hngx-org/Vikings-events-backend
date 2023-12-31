const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../config/config');
const Comments = require('./5-comments');

class Images extends Model {}

Images.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
  },
);

// Images.belongsToMany(Comments, {
//   through: 'comment_images',
//   foreignKey: 'image_id',
// });

module.exports = Images;
