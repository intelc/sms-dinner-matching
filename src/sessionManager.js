const session = require("../schema/session")

//create a new session, number is user phone number, return session id = user number
var initializeSession = function(number) {
    return sid;
}

//move session to next stage; numberList is int list for eithre location for time slots
//for RSVP and confirmation reminder pass [-1] for cancel and [1] for confirm
//for post-survey pass [experience rating]
//return request id when request is updated, and None otherwise
var nextStage = function(sid, numberList) {
    return requestId;
}

//put in user location inputs, locList is int list of location user selected
// called by nextStage()
var inputLocation = function(sid, locList) {
    return;
}

//put in user time slot inputs, timeList is int list
// called by nextStage()
var inputTimeSlot = function (sid, timeList) {
    return;
}

// called by nextStage()
var createRequest = function (sid) {
    return requestId;
}




module.exports = [initializeSession, nextStage]