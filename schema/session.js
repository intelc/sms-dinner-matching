const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const sessionSchema = new mongoose.Schema({
    number:      { type: Number, required: true },
    date:        { type: Date, default: Date.now },
    stage:       { type: Number, required: true, min: 0, max: 5},
    data: {
        location: [Number],
        timeSlot: [Number]
    },
    requestId: Number
  });

sessionSchema.plugin(passportLocalMongoose);

var session = mongoose.model('session', sessionSchema);

module.exports = session