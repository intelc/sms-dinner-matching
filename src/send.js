var config = require('../config');
var client = require('twilio')(config.accountSid, config.authToken);

const locations = { 1: "1920 Commons", 
                    2: "English House",
                    3: "Hill House", 
                    4: "Houston Market", 
                    5: "Lauder College House",
                  }
const timeSlots = { 1: "5:00 pm",
                    2: "5:30 pm", 
                    3: "6:00 pm", 
                    4: "6:30 pm", 
                    5: "7:00 pm", 
                    6: "7:30 pm",
                    7: "8:00 pm"
                  }

var send = function(number,msg) {
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

const sendAskLocation = function(number) {
  var msg = "Welcome to the Penn dinner buddy matching system. Please enter your preferred location:\n";
  for (key in locations) {
    msg += key
    msg += ". "
    msg += locations[key]
    msg += "\n"
  };
  msg += "To enter multiple locations, simply enter multiple numbers."
  this.send(number, msg);
}

const sendAskTime = function(number) {
  var msg = "Great! Now please enter your preferred location:\n";
  for (key in locations) {
    msg += key
    msg += ". "
    msg += locations[key]
    msg += "\n"
  };
  msg += "To enter multiple locations, simply enter multiple numbers."
  this.send(number, msg);
}



module.exports = [locations, timeSlots, send, sendAskLocation]
//exports.send = send;