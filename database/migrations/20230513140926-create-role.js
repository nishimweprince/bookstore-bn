'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: () => {
          // Generate a random UUID and truncate it to 12 characters
          const uuid = Sequelize.UUIDV4().replace(/-/g, '');
          return uuid.slice(0, 12);
        },
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  },
};
