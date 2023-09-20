const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/config')

class EventThumbnail extends Model {}

EventThumbnail.init(
  {
    event_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
    image_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Images',
        key: 'id',
      },
    },
  },

  {
    sequelize,
    modelName: 'EventThumbnail',
    tableName: 'event_thumbnail',
    timestamps: false,
  }
)

module.exports = EventThumbnail
