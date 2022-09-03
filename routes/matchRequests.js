var MessagingResponse = require('twilio').twiml.MessagingResponse;
var twilio = require('twilio');
var express = require('express');
var router = express.Router();
// var Property = require('../models/property');
// var Reservation = require('../models/reservation');
var Session = require('../schema/session');
var notifier = require('../src/send');
const {v4} = require('uuid');

// POST: /reservations
// This first method is for server initiated massages which are 
// *status updates* - (time based) 
// *send result after matching*
// *survey*
router.post('/', function (req, res) {
//   var propertyId = req.body.propertyId;
//   var user = req.user;

//   Property.findOne({ _id: propertyId })
//   .then(function (property) {
//     var reservation = new Reservation({
//       message: req.body.message,
//       property: propertyId,
//       guest: user.id
//     });

//     return reservation.save();
//   })
//   .then(function () {
//     notifier.sendNotification();
//     res.redirect('/properties');
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
    res.send("/post");
});

// POST: /reservations/handle
// This second method is for user initiated massages which are everything else, 
// use stage to determine what to do response
router.post('/handle', twilio.webhook({validate: false}), function (req, res) {
  var from = req.body.From;
  var smsRequest = req.body.Body;
  console.log(req.body)
  var smsResponse;

  Session.findOne({number: from})
  .then(function (host) {
    if (host == null) {
      console.log("create new user");
        var message = `Hi ${String(from).replace("+1","")}, want to grab dinner with a schoolmate? Enter ur desired location`;
        var newSession = new Session({
          number:      from,
          stage:       0,
          requestId: v4()
              });
          
        newSession.save();
        respond(res, message);
    }
    else{
      console.log("old user",host);
      // var message = `Hi ${String(from).replace("+1","")},welcome back`
      var message; 
      switch(host.stage){
        case 0:
          //parse message
          message = `you answered ${smsRequest}, enter time slot`;
          // host.stage = 1;
          // host.save()
          stageHandler(host)

          break;
        case 1:
          //parse message
          message = `you answered ${smsRequest}, we are matching you with a schoolmate`;
          stageHandler(host)
          break;

        default:
          message = `something went wrong`;
      }
      respond(res, message);
      
    }
   
  })
  .catch(function (err) {
    respond(res, "err");
      });

});

var respond = function(res, message) {
  var messagingResponse = new MessagingResponse();
  messagingResponse.message({}, message);

  res.type('text/xml');
  res.send(messagingResponse.toString());
}

module.exports = router;