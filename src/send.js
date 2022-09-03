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
  var msg = "Welcome to the Penn dinner buddy matching system. Please enter your preferred location:\n\n";
  for (key in locations) {
    msg += key
    msg += ". "
    msg += locations[key]
    msg += "\n"
  };
  msg += "\nTo enter multiple locations, simply enter multiple numbers (ex.134)."
  this.send(number, msg);
}

const sendAskTime = function(number) {
  var msg = "Great! Now please enter your preferred time slots:\n\n";
  for (key in timeSlots) {
    msg += key
    msg += ". "
    msg += timeSlots[key]
    msg += "\n"
  };
  msg += "\nTo enter multiple time slots, simply enter multiple numbers (ex.134)."
  this.send(number, msg);
}

const sendWaitingForMatch = function(number) {
  var msg = "We are currently matching you with a dinner buddy. Please wait patiently for a few minutes. We will send you a message when we find a match for you."
  this.send(number, msg);
}

const sendWaitingMatched = function(number, info) {
  var msg = "We have found a match for you! Your match's number is " + info + ". Please reply with 'yes' to confirm your match, or 'no' to cancel your match." 
  this.send(number, msg);
}

const sendEnd = function(number) {
  var msg = "Thank you for using the Penn dinner buddy matching system. We hope you have a great dinner!"
  this.send(number, msg);
}

const sendConfirmed = function(number) {  
  var msg = "Thank you for confirming your match. We hope you have a great dinner!"
  this.send(number, msg);
}

const sendReminder = function(numbers, time, location) {  
  //send a message to each number in numbers
  numbers.forEach(function(number){
    var msg = "Hi! This is a T-30 mins reminder that you have a dinner appointment at " + time + " at " + location + "."
    send(number, msg);
  })
 
}


const sendLocError = function(number) {
  send(number, "Sorry, we didn't understand your location preference. Try entering again. \nFor example, enter '123' for the first three locations.");

}

const sendTimeError = function(number) {
  send(number, "Sorry, we didn't understand your time preference. Try entering again. \nFor example, enter '123' for the first three time slots.");

}
const sendConfirmError = function(number) {
  send(number, "Sorry, we didn't understand your response. Please enter 'yes' or 'no'.");
}
const sendSurveyError = function(number) {
  send(number, "Sorry, we didn't understand your response. Please enter '1' for 'yes', '2' for 'no', and '3' for 'unsure'.");
}

module.exports = {locations, timeSlots, send, sendAskLocation, sendAskTime, sendWaitingForMatch, sendWaitingMatched, sendEnd, sendConfirmed, sendLocError, sendTimeError, sendConfirmError, sendSurveyError,sendReminder};
//exports.send = send;

