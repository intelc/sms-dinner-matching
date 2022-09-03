const Session = require("../schema/session")
const MatchRequest = require("../schema/matchRequest");
const {parseReqNumber, parseReqYesNo,parseReqSurvey} = require("./msgParser");

const send = require("./send");


//create a new session, number is user phone number
const initializeSession = async function(from) {
    var s = new Session ({number: from, stage: 0});
    s.save();
    return s;
}

const terminateSession = async function (from) {
    return;
}

//put in user location inputs, locList is int list of location user selected
const inputLocation = async function(s, locList) {
    return updated;
}

//put in user time slot inputs, timeList is int list
const inputTimeSlot = async function (s, timeList) {
    return updated;
}

const createMatchRequest = async function (s) {
    var r = new MatchRequest({_id: v4(), number: s.number, data: s.data});
    match.matchReq(r);
    return r;
}

//move session to next stage; res: response
//return whether user response is valid
const handle = async function(from, smsRequest) {
    const query = {number: from}
    var s = await Session.findOne(query)
    if (!s) {
        s = initializeSession(from);
    }
    if (s.stage == 0) { //user sends initial text
        send.sendAskLocation(from);
    } else if (s.stage == 1) { //user sends location preference
        var locList = parseResNumber(smsRequest);
        if (!locList) {
            send.sendLocError(from);
            return -1;
        }
        inputLocation(s, locList);
        send.sendAskTime(from);
    } else if (s.stage == 2) { //user sends time preference
        var timeList = parseReqNumber(smsRequest);
        if (!timeList) {
            send.sendTimeError(from);
            return -1;
        }
        inputTimeSlot(s, timeList);
        createMatchRequest(s);
    } else if (s.stage == 3) { //user sends RSVP message
        var confirm = parseReqYesNo(smsRequest);
        if (confirm == null) {
            send.sendConfirmError(from);
            return -1;
        }
        if (confirm == 0) {
            send.sendEnd(from);
            terminateSession(from);
            return 0;
        } else {
            send.sendConfirmed(from);
        }
    } else if (s.stage == 4) { //reminder
        //TODO
    } else if (s.stage == 5) { //survey
        var surveyRes = parseReqSurvey(smsRequest);
        if (!surveyRes) {
            send.sendSurveyError(from);
            return -1;
        }
        recordSurvey(s, surveyRes);
        send.sendEnd(from);
    } else {
        console.log("Error: illegal session state");
        return -1;
    }
    s.stage += 1;
    
    return 0;
}






module.exports = {handle}