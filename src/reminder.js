var cron = require('node-cron');
const Appointment = require("../schema/appointment");
var send = require('../src/send');

//appointment needs to have a "reminded"

var task = cron.schedule('*/1 * * * *',  async function(){
  console.log('running a task every minute');
    //filter Appointment collection to find all appointment that are due to expire in 30mins using mongoose aggregation query
    var now =Date.now();
    var thirtyMins = now + 1800000; 
    var appointments = await Appointment.find({reminded: false, time: {$gt: now, $lt: thirtyMins}});

    console.log(appointments);
    
    appointments.forEach(async function(appointment){
        //update appointment.reminded to true
        console.log("imhere1");
        await send.sendReminder(
            appointment.numbers,
            appointment.time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York' }),
            appointment.location
        )
        console.log("imhere2");
        appointment.reminded = true;
        appointment.save();
    })
    
    
}, {
    scheduled: false
  });

module.exports = task;

