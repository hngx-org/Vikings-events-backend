/* eslint-disable no-console */
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    migrationStorageTableName: 'migrations',
    host: process.env.DB_HOST,
    port: 3306,
  },
);

(async () => {
  try {
    // Switched it so my db tables will be created automatically on mysql database
    await sequelize.sync();
    console.log('Database Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
