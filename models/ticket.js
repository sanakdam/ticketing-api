'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    code: DataTypes.STRING,
    status: DataTypes.TINYINT,
    outlet: DataTypes.STRING,
    area: DataTypes.STRING,
    strata: DataTypes.STRING,
    information: DataTypes.STRING,
    table: DataTypes.STRING
  }, {
  	freezeTableName: true,
    timestamps: false
  });
  ticket.associate = function(models) {
  };
  return ticket;
};