'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('roles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            title: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            createdBy: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: true,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedBy: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: true,
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
            deletedBy: {
                type: Sequelize.INTEGER(10).UNSIGNED,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('roles');
    },
};
