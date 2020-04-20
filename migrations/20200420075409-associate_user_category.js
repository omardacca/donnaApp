'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'Categories', // name of Source model
      ['userId'], // name of the key we're adding 
      {
        type: 'foreign key',
        name: 'FK_users_category_userId',
        references: {
          table: 'Users',
          field: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Users',
      'FK_user_category_userId',
    )
  }
};
