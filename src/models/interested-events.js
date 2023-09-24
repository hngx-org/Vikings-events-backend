const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./1-users');
const Events = require('./3-events');

class InterestedEvents extends Model {}

InterestedEvents.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Events,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'InterestedEvents',
    tableName: 'interested_events',
    timestamps: false,
  },
);

InterestedEvents.removeAttribute('id');

module.exports = InterestedEvents;
