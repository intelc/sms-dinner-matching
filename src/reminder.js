var cron = require('node-cron');
const Appointment = require("../schema/appointment");


//appointment needs to have a "reminded"

var task = cron.schedule('*/1 * * * *', function(){
  console.log('running a task every minute');
    //filter Appointment collection to find all appointment that are due to expire in 30mins using mongoose aggregation query
    Appointment.aggregate([
        {
            $match: {
                $expr: {
                    $lt: [
                        { $subtract: [ "$date", new Date() ] },
                        1800000
                    ]
                }, reminded: false
            }
        }
    ]).then(function(appointments){
        //for each appointment, send a reminder to the user
        appointments.forEach(function(appointment){
            //update appointment.reminded to true
            appointment.reminded = true;
            appointment.save();
        })
    }
    )
});

module.exports = task;

