
const Task = require('./Task');
const Users = require('./Users');


const getStatus = new Task({
    id: 2,
    name: 'Read State',
    userInput: {},
    inputType: 'number',
    nextPossibleTask: [],
    executionFunction: Users.getUserExpensesStatus,
    load: Task.loadGetStatusParameters,

});

// should return list of Categories
const addExpensesPicked = new Task({
    id: 1,
    name: 'addExpensesPicked',
    userInput: {},
    validate: (amount) => { return typeof amount === 'number' },
    nextPossibleTask: {...addExpenseAmount},
    executionFunction: Users.getUserCategoriesAsMessage,
    load: Task.loadGetCategoriesList,
});


// should store amount (new expense to db and return finish message)
const addExpenseAmount = new Task({
    id: 1,
    name: 'addExpenseAmount',
    userInput: {},
    nextPossibleTask: [],
    executionFunction: Users.addExpense,
    load: (amount) => { 
        this.params.amount = parseFloat(amount)
        
    },
});

module.exports.getStatus = getStatus;
module.exports.addExpensesPicked = addExpensesPicked;
module.exports.addExpenseAmount = addExpenseAmount;
