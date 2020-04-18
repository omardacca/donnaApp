'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Name: DataTypes.STRING,
    userId: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.User, {
      foreignKey: 'userId'
    });
    models.User.belongsTo(Category);
  };
  return Category;
};