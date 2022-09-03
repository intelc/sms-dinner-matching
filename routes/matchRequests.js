var MessagingResponse = require('twilio').twiml.MessagingResponse;
var twilio = require('twilio');
var express = require('express');
var router = express.Router();
// var Property = require('../models/property');
// var Reservation = require('../models/reservation');
// var User = require('../models/user');
var notifier = require('../src/send');

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

//   User.findOne({phoneNumber: from})
//   .then(function (host) {
//     return Reservation.findOne({status: 'pending'});
//   })
//   .then(function (reservation) {
//     if (reservation === null) {
//       throw 'No pending reservations';
//     }
//     reservation.status = smsRequest.toLowerCase() === "accept" ? "confirmed" : "rejected";
//     return reservation.save();
//   })
//   .then(function (reservation) {
//     var message = "You have successfully " + reservation.status + " the reservation";
//     respond(res, message);
//   })
//   .catch(function (err) {
//     var message = "Sorry, it looks like you do not have any reservations to respond to";
//     respond(res, message);
//   });
// respond(res, "hello");
// notifier.sendNotification();
respond(res, `The following message has been received by SMS bot: ${smsRequest}`);
res.send("/handle")
});

var respond = function(res, message) {
  var messagingResponse = new MessagingResponse();
  messagingResponse.message({}, message);

  res.type('text/xml');
  res.send(messagingResponse.toString());
}

module.exports = router;