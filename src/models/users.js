const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.STRING,
      unique: true,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize,
    underscored: true,
    modelName: 'User',
    tableName: 'user',
    timestamps: false,
  }
);

module.exports = User;
