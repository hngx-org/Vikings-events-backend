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
    // Removed the sync, there is no need to sync the database if we migration files

    await sequelize.authenticate();
    console.log('Database Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
