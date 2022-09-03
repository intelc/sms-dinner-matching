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
    matchingRequestId: String,
    survey: {
        complete: Boolean,
        satisfaction: Number
    }
  },{ collection: 'MatchRequests'});

requestSchema.plugin(passportLocalMongoose);

const MatchRequest = mongoose.model('MatchRequest', requestSchema);

module.exports = MatchRequest