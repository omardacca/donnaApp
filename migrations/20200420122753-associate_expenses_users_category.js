'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addConstraint(
        'Expenses', // name of Source model
        ['userId'], // name of the key we're adding 
        {
          type: 'foreign key',
          name: 'FK_expenses_users_userId',
          references: {
            table: 'Users',
            field: 'id'
          },
  
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        });
        
        await queryInterface.addConstraint(
          'Expenses', // name of Source model
          ['categoryId'], // name of the key we're adding 
          {
            type: 'foreign key',
            name: 'FK_expenses_categories_categoryId',
            references: {
              table: 'Categories',
              field: 'id'
            },
    
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          });
    } catch(error) {
      console.log(`error: ${error}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'Users',
      'FK_expenses_users_userId',
    );

    await queryInterface.removeConstraint(
      'Categories',
      'FK_expenses_categories_categoryId',
    );

  }
};
