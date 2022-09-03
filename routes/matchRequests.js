var MessagingResponse = require('twilio').twiml.MessagingResponse;
var twilio = require('twilio');
var express = require('express');
var router = express.Router();
// var Property = require('../models/property');
// var Reservation = require('../models/reservation');
var Session = require('../schema/session');
var notifier = require('../src/send');
var sessionManager = require('../src/sessionManager');
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

  sessionManager.handle(from, smsRequest,res)

});



module.exports = router;