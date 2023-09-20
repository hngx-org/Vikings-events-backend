const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class Groups extends Model {}

Groups.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Groups',
    tableName: 'groups',
    timestamps: false,
  }
);

module.exports = Groups;
