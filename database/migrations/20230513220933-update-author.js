'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('authors', 'email');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('authors', 'email');
  }
};
