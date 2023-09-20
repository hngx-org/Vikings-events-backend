const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Comment
