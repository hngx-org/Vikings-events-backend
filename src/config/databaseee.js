require('dotenv').config();

// const { Sequelize } = require('sequelize');

const sequelize = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};

module.exports = sequelize;
