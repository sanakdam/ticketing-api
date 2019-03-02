'use strict';
module.exports = (sequelize, DataTypes) => {
  const dashboard = sequelize.define('dashboard', {
    reg_id: DataTypes.TEXT,
    count: DataTypes.INTEGER
  }, {
      timestamps: true,
  	  timestamps: false
  });
  dashboard.associate = function(models) {
    // associations can be defined here
  };
  return dashboard;
};