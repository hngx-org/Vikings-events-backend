const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');

class UserGroups extends Model {}
UserGroup.init(
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'User',
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
  }
);

module.exports = UserGroups;
