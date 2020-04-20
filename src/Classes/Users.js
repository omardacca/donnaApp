const moment = require('moment');
const models = require('../../models');

class Users {
    static async findOrCreateUser(phoneNumber) {
        try {
            let record = await models.sequelize.models.User.findOne({ 
                where: { phoneNumber }
            });

            let created = false;
            if(!record) {
                record = await models.sequelize.models.User.create({
                    phoneNumber
                });
                created = true;
            }
            
            return [record, created];
        } catch(error) {
            console.log(error);
            return [null, null];
        }
    }

    static async addExpense(expensesObject) {
        if(!expensesObject || !expensesObject.categoryId || !expensesObject.userId || !expensesObject.amount || typeof expensesObject.amount !== 'number') {
            console.log(`addExpense: invalid parameteres`);
            return null;
        }
        try {
            const record = await models.sequelize.models.Expenses.create({
                userId: expensesObject.userId,
                categoryId: expensesObject.categoryId,
                amount: expensesObject.amount,
            });

            return record;
        } catch(error) {
            console.log(`error while adding expense for user: ${userId}, and category: ${categoryId}`);
        }
    }

    static async getUserExpensesStatus(options) {
        try {

            let expensesResults = await models.sequelize.models.Expenses.findAll({
                where: {
                    userId: options.userId,
                    createdAt: {
                        $between: [
                            dateOfMonth.startOf('M').format(), 
                            endDate.lastOf('M').format()
                        ]
                    }
                },
                include: [{
                    model: models.sequelize.models.Category, as: 'Category', required: true,
                  }],
            });
    
            if(!expensesResults) {
                return 'لم يتم تسجيل مصروفات حتى الان';
            }
    
            if(!Array.isArray(expensesResults)) {
                return 'Error!'
            }
    
            expensesResults = expensesResults.map(expensesResults.dataValues);
            expensesResults.forEach((expense) => {
                console.log(expense);
            });

        } catch(error) {
            console.log(`error while executing getUserExpensesStatus, error: ${error}`);
        }
    }
}

module.exports = Users;