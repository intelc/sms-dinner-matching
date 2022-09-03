var MessagingResponse = require('twilio').twiml.MessagingResponse;

// send() should be used instead of this respond() function
var respond = function(res, message) {
    var messagingResponse = new MessagingResponse();
    messagingResponse.message({}, message);
  
    res.type('text/xml');
    res.send(messagingResponse.toString());
  }

  exports.respond = respond;