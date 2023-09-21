const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class GroupEvents extends Model {}

GroupEvents.init(
  {
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id',
      },
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'GroupEvents',
    tableName: 'group_events',
    timestamps: false,
  },
);

module.exports = GroupEvents;
