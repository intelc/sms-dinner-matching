const mongoose = require('mongoose');


const requestSchema = new mongoose.Schema({
    requestId: String,
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
    },
    appointmentID: String
  },{ collection: 'MatchRequests'});



const MatchRequest = mongoose.model('MatchRequest', requestSchema);

module.exports = MatchRequest