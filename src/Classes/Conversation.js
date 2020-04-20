
const CacheManager = require('./Classes/CacheManager');

class Conversation {
    constructor(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    async load() {
        this.state = await CacheManager.get({ key: this.phoneNumber});
    }

}

module.exports = Conversation;



Task 

Id: 1,
Name: 'Add Expense'
userInpu
inputType: string|number
nextPossibleTask: [AddExpense]


state

{
    "9348593": { 
        lastSuccessfulTask: { 
            Id: 1,
            Name: 'Add Expense'
            userInpu
            inputType: number
            nextPossibleTask: [AddCategory]
        }
    }
}
