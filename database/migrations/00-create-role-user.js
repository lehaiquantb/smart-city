'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('role_users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED,
            },
            role_id: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: false,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('role_users');
    },
};
