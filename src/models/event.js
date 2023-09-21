import { DataTypes } from 'sequelize'

const Event = (sequelize, Sequelize) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.STRING(60),
      primaryKey: true,
      allowNull: false, // Add validation for not null
    },
    title: {
      type: DataTypes.STRING(60),
      allowNull: false, // Add validation for not null
    },
    description: {
      type: DataTypes.STRING(1024),
    },
    creator_id: {
      type: DataTypes.STRING(60),
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: true, // Add validation for not null
    },
    location: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false, // Add validation for not null
      isDate: true, // Add validation for date format
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false, // Add validation for not null
      isDate: true, // Add validation for date format
    },
    start_time: {
      type: DataTypes.TIME,
      isTime: true, // Add custom validation for time format
    },
    end_time: {
      type: DataTypes.TIME,
      isTime: true, // Add custom validation for time format
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      comment: 'Url to the thumbnail',
      isUrl: true, // Add validation for URL format
    },
  })
  return Event
}


// Association of event to user-events
Event.belongsToMany(User, {
  through: 'UserEvents',
  foreignKey: 'event_id',
});

export default Event
