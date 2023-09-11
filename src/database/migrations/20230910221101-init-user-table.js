'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      phone: {
        type: Sequelize.CHAR(12),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.CHAR(256),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.CHAR(64),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Date.now(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Date.now(),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
