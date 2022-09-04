const mongoose = require('mongoose');


const sessionSchema = new mongoose.Schema({
    number:      { type: Number, required: true },
    date:        { type: Date, default: Date.now },
    stage:       { type: Number, required: true, min: 0, max: 5},
    data: {
        location: [Number],
        timeSlot: [Number]
    },
    requestId: String
  });



const Session = mongoose.model('Session', sessionSchema);

module.exports = Session