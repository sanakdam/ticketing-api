'use strict';
module.exports = (sequelize, DataTypes) => {
  const dashboard = sequelize.define('dashboard', {
    reg_id: DataTypes.TEXT,
    count: DataTypes.INTEGER
  }, {
      freezeTableName: true,
  	  timestamps: false
  });
  dashboard.associate = function(models) {
    // associations can be defined here
  };
  return dashboard;
};