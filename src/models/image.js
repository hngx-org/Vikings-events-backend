const Sequelize = require('sequelize')

const sequelize = require('../utils/database.js')

const Image = sequelize.define('image', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Image
