
const Task = require('./Task');
const Users = require('./Users');


const getStatus = new Task({
    id: 2,
    name: 'Read State',
    userInput: null,
    inputType: number,
    nextPossibleTask: [],
    executionFunction: Users.getUserExpensesStatus,
    load: Users.loadGetStatusParameters,

});

module.exports.getStatus = getStatus;
