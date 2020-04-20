'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expenses = sequelize.define('Expenses', {
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Expenses.associate = function(models) {
    // associations can be defined here
  };
  return Expenses;
};