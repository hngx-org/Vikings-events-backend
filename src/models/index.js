import {Sequelize, DataTypes} from 'sequelize';
import sequelize from '../config/database.js';
import Event from './event.js';

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Event = Event(sequelize,Sequelize);

db.sequelize.sync({ force: false }).then(() => {
  console.log('sync complete, Table created')
}).catch((error)=>{
  console.log("Unable to sync database", error)
})

export default db;
