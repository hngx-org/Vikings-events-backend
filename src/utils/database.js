const Sequelize = require('sequelize')

const sequelize = new Sequelize('vikings-project', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
})

module.exports = sequelize
