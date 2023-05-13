'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
        defaultValue: () => {
          // Generate a random UUID and truncate it to 12 characters
          const uuid = DataTypes.UUIDV4().replace(/-/g, '');
          return uuid.slice(0, 12);
        },
      },
      name : {
      type: DataTypes.STRING,
      allowNull: false,
    },
      email : {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    },
    {
      sequelize,
      modelName: 'author',
    }
  );
  return author;
};