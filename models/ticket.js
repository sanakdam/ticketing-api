'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    code: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
  	timestamps: false
  });
  ticket.associate = function(models) {
  };
  return ticket;
};