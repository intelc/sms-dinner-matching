const mongoose = require('mongoose');


const requestSchema = new mongoose.Schema({
    requestId: String,
    number:      { type: Number, required: true },
    date:        { type: Date, default: Date.now },
    data: {
        location: [Number],
        timeSlot: [Number]
    },
    confirmed:    { type: Boolean, default: false},
    //id of request this request is matched with, None when no match found
    matchingRequestId: {type: String},
    survey: {
        complete: Boolean,
        satisfaction: Number
    },
    appointmentId: String
  });



const MatchRequest = mongoose.model('MatchRequest', requestSchema);
const MatchRequestArc = mongoose.model('MatchRequestArc', requestSchema);

const moveMatchRequestToArchive = async function(request) {
    var arc = new MatchRequestArc(request.toJSON());
    await arc.save();
    await MatchRequest.deleteOne({requestId: request.requestId});
}

module.exports = {MatchRequest, MatchRequestArc, moveMatchRequestToArchive}