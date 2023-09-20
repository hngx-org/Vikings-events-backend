const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const Group = sequelize.define('group', {
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
})

module.exports = Group
