const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const Events = require('./events');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.TEXT,
    },
  },

  {
    sequelize,
    underscored: true,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  },
);
// Association for users to user-events
// User.belongsToMany(Events, {
//   through: 'UserEvents',
//   foreignKey: 'user_id',
// });

module.exports = User;
