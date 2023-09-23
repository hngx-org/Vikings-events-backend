const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./users');

class UserGroup extends Model {}

UserGroup.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'UserGroups',
    tableName: 'user_groups',
    timestamps: false,
  },
);

// Remove the 'id' attribute from the UserGroup model
UserGroup.removeAttribute('id');

module.exports = UserGroup;
