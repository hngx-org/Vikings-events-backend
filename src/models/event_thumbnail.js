const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const Events = require('./3-events');
const Images = require('./4-images');

class EventThumbnail extends Model {}

EventThumbnail.init(
  {
    event_id: {
      type: DataTypes.UUID,
      references: {
        model: Events,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    image_id: {
      type: DataTypes.UUID,
      references: {
        model: Images,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },

  {
    sequelize,
    modelName: 'EventThumbnail',
    tableName: 'event_thumbnail',
    timestamps: false,
  },
);

EventThumbnail.removeAttribute('id');

module.exports = EventThumbnail;
