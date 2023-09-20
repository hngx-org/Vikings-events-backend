import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  // Sequelize configuration 
});

const Group = sequelize.define('Group', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Group;
