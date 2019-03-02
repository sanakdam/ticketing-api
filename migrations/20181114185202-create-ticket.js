'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ticket', {
        code: DataTypes.STRING,
        status: DataTypes.TINYINT,
        outlet: DataTypes.STRING,
        area: DataTypes.STRING,
        strata: DataTypes.STRING,
        information: DataTypes.STRING    
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ticket');
  }
};