'use strict'

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
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
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
        })
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users')
    },
}
