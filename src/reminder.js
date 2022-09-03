var cron = require('node-cron');
const Reservation = require("../schema/reservation");


//reservation needs to have a "reminded"

var task = cron.schedule('*/1 * * * *', function(){
  console.log('running a task every minute');
    //filter Reservation collection to find all reservation that are due to expire in 30mins using mongoose aggregation query
    Reservation.aggregate([
        {
            $match: {
                $expr: {
                    $lt: [
                        { $subtract: [ "$date", new Date() ] },
                        1800000
                    ]
                }
            }
        }
    ]).then(function(reservations){
        //for each reservation, send a reminder to the user
        reservations.forEach(function(reservation){
            
        })
    }
    )
});

module.exports = task;

