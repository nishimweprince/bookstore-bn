'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'slug', {
      type: Sequelize.STRING,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
    });
    await queryInterface.addColumn('authors', 'slug', {
      type: Sequelize.STRING,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
    });
    await queryInterface.addColumn('authors', 'photo', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'slug');
    await queryInterface.removeColumn('authors', 'slug');
  }
};
