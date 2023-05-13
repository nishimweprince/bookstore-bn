'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // USER
      order.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      // BOOK
      order.belongsTo(models.book, {
        as: 'book',
        foreignKey: 'bookId',
        onDelete: 'CASCADE',
      });
    }
  }
  order.init(
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
      bookId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'order',
    }
  );
  return order;
};
