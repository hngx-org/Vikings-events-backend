const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../config/config');

class Groups extends Model {}

Groups.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
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
  },
);

module.exports = Groups;
