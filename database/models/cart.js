'use strict';
const { Model } = require('sequelize');

// IMPORT REUSABLE ATTRIBUTES
const { foreignKey } = require('../utils/attributes');

module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // USER
      cart.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      // BOOK
      cart.belongsTo(models.book, {
        as: 'book',
        foreignKey: 'bookId',
        onDelete: 'CASCADE',
      });
    }
  }
  cart.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4},
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookId: foreignKey,
    },
    {
      sequelize,
      modelName: 'cart',
    }
  );
  return cart;
};
