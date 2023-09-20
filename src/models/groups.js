const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Groups extends Model {}

Groups.init(
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
  },
  {
    sequelize,
    modelName: 'Groups',
    tableName: 'groups',
    timestamps: false,
  }
);

module.exports = Groups;
