const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  access_token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = User
