const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const Groups = require('./2-groups');
const Events = require('./3-events');

class GroupEvents extends Model {}

GroupEvents.init(
  {
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Groups,
        key: 'id',
      },
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Events,
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

GroupEvents.removeAttribute('id');

module.exports = GroupEvents;
