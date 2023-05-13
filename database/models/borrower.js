'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class borrowers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // USER
      borrowers.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      // BOOK
      borrowers.belongsTo(models.book, {
        as: 'book',
        foreignKey: 'bookId',
        onDelete: 'CASCADE',
      });
    }
  }
  borrowers.init(
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
      modelName: 'borrower',
    }
  );
  return borrowers;
};
