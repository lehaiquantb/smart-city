'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED,
            },
            fullName: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
            },
            birthday: {
                type: Sequelize.DATE,
            },
            gender: {
                allowNull: false,
                type: Sequelize.ENUM('male', 'female', 'other'),
                defaultValue: 'other',
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    },
};
