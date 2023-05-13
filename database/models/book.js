'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // USER
      book.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      // AUTHOR
      book.belongsTo(models.author, {
        as: 'author',
        foreignKey: 'authorId',
        onDelete: 'CASCADE',
      });
      // GENRE
      book.belongsTo(models.genre, {
        as: 'genre',
        foreignKey: 'genreId',
        onDelete: 'CASCADE',
      });
      // BORROWER
      book.hasMany(models.borrower, {
        as: 'borrower',
        onDelete: 'CASCADE',
      });
      // CART
      book.hasMany(models.cart, {
        as: 'cart',
        onDelete: 'CASCADE',
      });
    }
  }
  book.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      releaseYear: DataTypes.INTEGER,
      isbn: DataTypes.STRING,
      cover: DataTypes.STRING,
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genreId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      copies: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'book',
    }
  );
  return book;
};
