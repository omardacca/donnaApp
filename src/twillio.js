var twilio = require('twilio');


/** incoming message body: req.body */
// {
//     "SmsMessageSid":"SM0d2dba91d5c9cd1f74846b3e11a2c280",
//     "NumMedia":"0",
//     "SmsSid":"SM0d2dba91d5c9cd1f74846b3e11a2c280",
//     "SmsStatus":"received",
//     "Body":"Hhhhh",
//     "To":"whatsapp:+14155238886",
//     "NumSegments":"1",
//     "MessageSid":"SM0d2dba91d5c9cd1f74846b3e11a2c280",
//     "AccountSid":"AC8a352dc740b51549e58e7f49295b22c0",
//     "From":"whatsapp:+972546104999",
//     "ApiVersion":"2010-04-01"
//     }



var accountSid = 'AC8a352dc740b51549e58e7f49295b22c0'; // Your Account SID from www.twilio.com/console
var authToken = 'de8969348a5598384f7671f05022c26d';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);


module.exports.sendMessage = async function(messageToSend, phoneNumber) {
    try {
        const message = await client.messages.create({
            body: `${messageToSend}`,
            to: `${phoneNumber}`,  // Text this number
            from: 'whatsapp:+14155238886' // From a valid Twilio number
        });

        if(message && message.sid);
        console.log(message.sid);

        return message.sid;

    } catch(error) {
        console.log(`error sending twillio message: ${error}`)
    }
}
