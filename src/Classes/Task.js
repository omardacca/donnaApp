/* this.id = 1,
this.name = 'Read State',
this.userInput = null,
this.inputType = number;
this.nextPossibleTask = []; */

const Users = require('./Users');
const moment = require('moment');

class Task {

    constructor(options) {
        this.id = options.id,
        this.name = options.name,
        this.userInput = options.userInput,
        this.inputType = options.inputType;
        this.executionFunction = options.executionFunction,
        this.nextPossibleTask = options.nextPossibleTask;
        this.load = options.load;
    }

    // in order to retreive { userId, dateOfMonth }
    static async loadGetStatusParameters(phoneNumber) { // userInput: phoneNumber
        const userId = await Users.findUserByPhoneNumber(phoneNumber);
        this.params = {
            userId: userId ? userId.id : null, 
            dateOfMonth: new moment(),
        }
    }

    static async loadGetCategoriesList(phoneNumber, categoryId) { // userInput: phoneNumber
        const userId = await Users.findUserByPhoneNumber(phoneNumber);
        this.params = {
            userId: userId ? userId.id : null, 
        }
        this.userInput = { ...this.userInput, categoryId}
    }

    static async loadaddExpenseAmountParams(phoneNumber, amount) { 
        const userId = await Users.findUserByPhoneNumber(phoneNumber);
        this.params = {
            userId: userId ? userId.id : null, 
        }
        this.userInput = { ...this.userInput, categoryId}
        this.params = parseFloat({ ...this.userInput, amount });
    }
    
}

module.exports = Task;