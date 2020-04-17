'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    phoneNumber: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: false,
      allowNull: false
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};


