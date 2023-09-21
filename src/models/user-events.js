const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class UserEvents extends Model {}

UserEvents.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
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
    modelName: 'UserEvents',
    tableName: 'user_events',
    timestamps: false,
  },
);



module.exports = UserEvents;
