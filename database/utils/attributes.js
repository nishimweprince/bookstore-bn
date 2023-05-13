/** @type {import('sequelize-cli').Migration} */

/**
 * MODEL ATTRIBUTES
 */

const DataTypes = require('sequelize').DataTypes;

const Sequelize = require('sequelize');

module.exports = {

    // FOREIGN KEY ATTRIBUTE
    foreignKey : {
      type: DataTypes.STRING,
      allowNull: false,
    }
};
