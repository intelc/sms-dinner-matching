var respond = function(res, message) {
    var messagingResponse = new MessagingResponse();
    messagingResponse.message({}, message);
  
    res.type('text/xml');
    res.send(messagingResponse.toString());
  }