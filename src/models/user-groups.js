const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class UserGroup extends Model {}
UserGroup.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    group_id: {
      type: DataTypes.INTEGER,
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

module.exports = UserGroup;
