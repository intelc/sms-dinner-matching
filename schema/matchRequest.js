const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const requestSchema = new mongoose.Schema({
    number:      { type: Number, required: true },
    date:        { type: Date, default: Date.now },
    data: {
        location: [Number],
        timeSlot: [Number]
    },
    //id of request this request is matched with, None when no match found
    matchingRequestId: Number,
    survey: {
        complete: Boolean,
        satisfaction: Number
    }
  });

requestSchema.plugin(passportLocalMongoose);

var request = mongoose.model('request', sessionSchema);

module.exports = request