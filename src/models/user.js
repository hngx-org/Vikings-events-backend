/* eslint-disable */
import dotenv from 'dotenv'
import { Sequelize, DataTypes } from 'sequelize'

dotenv.config()

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
  }
)

// Define the 'user' model
const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null for avatar
  },
})

// Sync the model with the database
;(async () => {
  try {
    await sequelize.sync()
    console.log('Table and model synced successfully')
  } catch (err) {
    console.error('Error syncing the table and model:', err)
  }
})()

export default sequelize // Export the Sequelize instance
