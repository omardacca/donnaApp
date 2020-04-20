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
        this.inputType = options.number;
        this.nextPossibleTask = options.nextPossibleTask;
        this.load = options.load;
    }

    // in order to retreive { userId, dateOfMonth }
    async loadGetStatusParameters(phoneNumber) { // userInput: phoneNumber
        const userId = await Users.findUserByPhoneNumber(phoneNumber);
        this.params = {
            userId: userId,
            dateOfMonth: new moment(),
        }
    }
    
}

module.exports = Task;