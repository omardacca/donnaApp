const moment = require('moment');
const models = require('../../models');

class Users {
    static async findUserByPhoneNumber(phoneNumber) {
        try {
            let record = await models.sequelize.models.User.findOne({ 
                where: { phoneNumber },
                attributes: ['id'],
            });

            return record;
            
        } catch(error) {
            console.log(error);
            return null;
        }
    }
    
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

    // TESTED: OK
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
            return null;
        }
    }

    static async getUserCategoriesAsMessage(options) {
        let categoriesResults = await models.sequelize.models.Category.findAll({
            where: {
                [models.Sequelize.Op.or]: [
                    {
                        userId: {
                            [models.Sequelize.Op.eq]: null,
                        },
                    },
                    {
                        userId: {
                            [models.Sequelize.Op.eq]: options.userId,
                        },
                    }
                ]                
            },
        });

        if(Array.isArray(categoriesResults)) {
            categoriesResults = categoriesResults.map(row => row.dataValues);
            
            let message = `الرجاء اختيار رقم الفئة:
            `
            categoriesResults.forEach((category) => {
                message += `${category.id}. ${category.Name}
                `
            });
            
         return message;   
        }

        return null;
    }


    // TESTED: OK
    static async getUserExpensesStatus(options) {
        try {

            let expensesResults = await models.sequelize.models.Expenses.findAll({
                where: {
                    userId: options.userId,
                    createdAt: {
                        [models.Sequelize.Op.between]: [
                            options.dateOfMonth.startOf('M').format(), 
                            options.dateOfMonth.endOf('M').format()
                        ]
                    }
                },
                include: [{
                    model: models.sequelize.models.Category, as: 'Category', required: true,
                    on: {
                        userId: models.Sequelize.where(models.Sequelize.col('Expenses.categoryId'), '=', models.Sequelize.col('Category.id')),
                      },
                  }],
            });
    
            if(!expensesResults) {
                return 'لم يتم تسجيل مصروفات حتى الان';
            }
    
            if(!Array.isArray(expensesResults)) {
                return 'Error!'
            }
    
            const aggregatedExpenses = { };
            let message = `المصروفات المتراكمه لهذا الشهر: 
            `;
            expensesResults = expensesResults.map(row => row.dataValues);
            expensesResults.forEach((expense) => {
                if(!aggregatedExpenses[expense.Category.Name]) {
                    aggregatedExpenses[expense.Category.Name] = expense.amount;
                } else {
                    aggregatedExpenses[expense.Category.Name] += expense.amount;
                }
            });

            Object.keys(aggregatedExpenses).forEach(key => {
                message += `${key}: ${aggregatedExpenses[key]}
                `
            });


            return message;

        } catch(error) {
            console.log(`error while executing getUserExpensesStatus, error: ${error}`);
        }
    }
}

module.exports = Users;