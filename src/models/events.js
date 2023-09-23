const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../config/config');

class Events extends Model {}

Events.init(
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
    description: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.TEXT,
    },
    creator_id: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
      allowNull: true, // Add validation for not null
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Events',
    tableName: 'events',
    timestamps: false,
  },
);

module.exports = Events;
