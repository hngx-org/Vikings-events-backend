const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creator_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  start_date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  start_time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  end_time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  thumbnail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Event
