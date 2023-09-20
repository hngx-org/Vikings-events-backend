const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class GroupEvents extends Model {}

GroupEventsi.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    event_id: {
      type: DataTypes.UUID,
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
  }
);

module.exports = GroupEvents;
