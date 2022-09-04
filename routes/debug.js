var twilio = require('twilio');
var express = require('express');
var router = express.Router();
// var Property = require('../models/property');
// var Reservation = require('../models/reservation');
var Session = require('../schema/session');
var {Appointment} = require('../schema/appointment');
var {MatchRequest} = require('../schema/matchRequest');
var {send} = require('../src/send');
var sessionManager = require('../src/sessionManager');
var {v4} = require('uuid');

router.get('/addAppointments', function (req, res) {
    
     //create new date be current time - 30mins
    var d = new Date();
    d.setMinutes(d.getMinutes() - 20);
    
    //create a new appointment and save it to the database
    var a = new Appointment({
        appointmentId: v4(),
        //array of two run time generated random phone numbers 
        numbers: [String(Math.floor(Math.random() * 10000000000)), String(Math.floor(Math.random() * 10000000000))],
        requests:    [v4(), v4()],
        time:        d,
        location:     "NUS",
        reminded:       false
  });
    a.save();
    res.send("Appointment added");
   
})

router.get('/purge', async function (req, res) {
    await Session.deleteMany({});
    await Appointment.deleteMany({});
    await MatchRequest.deleteMany({}) ;
   
   res.send("All deleted+");
  
})
  
module.exports = router;