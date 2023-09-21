const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class EventThumbnail extends Model {}

EventThumbnail.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
    image_id: {
      type: DataTypes.INTEGER,
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
  },
);

<<<<<<< HEAD
=======
EventThumbnail.removeAttribute('id');

>>>>>>> 606a4532c1cf1e82b01b1534b0d069b06c7e1c45
module.exports = EventThumbnail;
