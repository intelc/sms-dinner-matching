var config = require('../config');
var client = require('twilio')(config.accountSid, config.authToken);

const send = function(number,msg) {
    console.log("trying to send");
    // Send the notification
    client.messages.create({
      to: number,
      from: config.phoneNumber,
      body: msg
    })
    .then(function(res) {
      console.log(res.body);
    })
    .catch(function(err) {
      console.log(err);
    });
    console.log("sent");
//   });
};



exports.send = sendAskLocation,sendAskTime,sendLocError,sendTimeError;