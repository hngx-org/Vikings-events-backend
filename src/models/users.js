const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.TEXT,
    },
  },

  {
    sequelize,
    underscored: true,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  },
);

module.exports = User;
