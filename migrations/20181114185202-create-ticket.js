'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ticket', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        code: {
            allowNull: false,
            type: Sequelize.STRING
        },
        status: {
            defaultValue: 0,
            type: Sequelize.TINYINT
        },
        outlet: {
            allowNull: false,
            type: Sequelize.STRING
        },
        area: {
            allowNull: false,
            type: Sequelize.STRING
        },
        strata: {
            allowNull: false,
            type: Sequelize.STRING
        },
        information: {
            allowNull: false,
            type: Sequelize.STRING
        },
        table: {
            defaultValue: "",
            type: Sequelize.STRING
        }   
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ticket');
  }
};