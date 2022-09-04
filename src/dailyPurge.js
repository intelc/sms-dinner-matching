var cron = require('node-cron');
const {Appointment, AppointmentArc, moveAppointmentToArchive} = require("../schema/appointment");
const {MatchRequest, MatchRequestArc, moveMatchRequestToArchive} = require("../schema/matchRequest");
var Session = require('../schema/session');
var send = require('../src/send');

//appointment needs to have a "reminded"

//cron task to run every 10pm
var task = cron.schedule('* 0 * * *',  async function(){
    console.log("daily purge started");
    await Session.deleteMany({});
    await Appointment.find({}).then(async function(appointments){
        appointments.forEach(async function(appointment){
            await moveAppointmentToArchive(appointment);
        })
    }
    )
    await MatchRequest.find({}).then(async function(matchRequests){
        matchRequests.forEach(async function(matchRequest){
            await moveMatchRequestToArchive(matchRequest);
        })
    }
    )

    console.log("daily purge completed");
    
    
}, {
    scheduled: false
  });

module.exports = task;

