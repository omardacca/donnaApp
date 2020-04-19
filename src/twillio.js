var twilio = require('twilio');

//var accountSid = 'SM72b395e010abe91e6ec7dbec4e3e5dde';
var accountSid = 'AC8a352dc740b51549e58e7f49295b22c0'; // Your Account SID from www.twilio.com/console
var authToken = '4a636bf45ead2a114a94f08febc7b510';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);


module.exports.sendMessage = async function(messageToSend) {
    try {
        const message = await client.messages.create({
            body: `${messageToSend}`,
            to: 'whatsapp:+972546104999',  // Text this number
            from: 'whatsapp:+14155238886' // From a valid Twilio number
        });

        if(message && message.sid);
        console.log(message.sid);

        return message.sid;

    } catch(error) {
        console.log(`error sending twillio message: ${error}`)
    }
}
