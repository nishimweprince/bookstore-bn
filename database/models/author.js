'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class author extends Model {
    static associate(models) {
      // BOOK
      author.hasMany(models.book, {
        as: 'books',
        onDelete: 'CASCADE',
      });
    }
  }
  author.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'author',
    }
  );
  return author;
};
