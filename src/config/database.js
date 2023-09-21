import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: "mysql",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    }
  );

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  });

export default sequelize;
