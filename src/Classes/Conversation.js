
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