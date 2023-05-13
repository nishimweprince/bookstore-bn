'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // USER
      role.hasMany(models.user, {
        as: 'users',
        onDelete: 'CASCADE',
      });
    }
  }
  role.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => {
          // Generate a random UUID and truncate it to 12 characters
          const uuid = DataTypes.UUIDV4().replace(/-/g, '');
          return uuid.slice(0, 12);
        },
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'role',
    }
  );
  return role;
};
