const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./users');

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
    modelName: 'InterestedEvents',
    tableName: 'interested_events',
    timestamps: false,
  },
);

InterestedEvents.removeAttribute('id');

module.exports = InterestedEvents;
