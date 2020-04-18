var twilio = require('twilio');

//var accountSid = 'SM72b395e010abe91e6ec7dbec4e3e5dde';
var accountSid = 'AC84d44296e943a97e3d1686389db8f153'; // Your Account SID from www.twilio.com/console
var authToken = '5e30cac5af81d5a9543871ee5b1f16a2';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);


module.exports.sendMessage = async function(messageToSend) {
    try {
        const message = await client.messages.create({
            body: `${messageToSend}`,
            to: 'whatsapp:+972504222053',  // Text this number
            from: 'whatsapp:+14155238886' // From a valid Twilio number
        });

        if(message && message.sid);
        console.log(message.sid);

        return message.sid;

    } catch(error) {
        console.log(`error sending twillio message: ${error}`)
    }
}
