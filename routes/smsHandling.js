
var twilio = require('twilio');
var express = require('express');
var router = express.Router();
// var Property = require('../models/property');
// var Reservation = require('../models/reservation');
var Session = require('../schema/session');
var {send} = require('../src/send');
var sessionManager = require('../src/sessionManager');




router.post('/', function (req, res) {
  var from = req.body.From;
  var smsContent = req.body.Body;
  console.log("post endpoint: ");
  try{
    send(from, smsContent)
  }catch(err){
    console.log(err);
  }
  res.send("/post");
});



router.post('/handle', twilio.webhook({validate: false}), function (req, res) {
  var from = req.body.From;
  var smsRequest = req.body.Body;
  console.log(req.body)

  try{
    sessionManager.handle(from, smsRequest,res)
  }
  catch(err)
  {
    console.log("error")
    res.status(500).send(err);
  }

  res.send("/post/handle");

});



module.exports = router;