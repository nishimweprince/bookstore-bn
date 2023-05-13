'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // BOOK
      user.hasMany(models.book, {
        as: 'books',
        onDelete: 'CASCADE',
      });
      // ORDER
      user.hasMany(models.order, {
        as: 'orders',
        onDelete: 'CASCADE',
      });
      // CART
      user.hasOne(models.cart, {
        as: 'cart',
        onDelete: 'CASCADE',
      });
      // ROLE
      user.belongsTo(models.role, {
        as: 'role',
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
      });
    }
  }
  user.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: DataTypes.STRING,
      roleId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
