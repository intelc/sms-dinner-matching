const Session = require("../schema/session");
const MatchRequest = require("../schema/matchRequest");
const {parseReqNumber, parseReqYesNo, parseReqSurvey} = require("./msgParser");
const match = require("./match");

const send = require("./send");
const {v4} = require('uuid');

//create a new session, number is user phone number
const initializeSession = async function(from) {
    console.log("new session created");
    var s = new Session ({number: from, stage: 0});
    await s.save();

    return s;
}

const terminateSession = async function (from) {
    var n = await Session.deleteMany({number: from});
    console.log(n, " sessions terminated.")
    return;
}

//put in user location inputs, locList is int list of location user selected
const inputLocation = async function(s, locList) {
    s.data.location = locList;
    // await s.save();
    return;
}

//put in user time slot inputs, timeList is int list
const inputTimeSlot = async function (s, timeList) {
    s.data.timeSlot = timeList;
    // await s.save();
    return;
}

const createMatchRequest = async function (s) {

    var r = new MatchRequest({requestId: v4(), number: s.number, data: s.data});

    // match.matchReq(r);
    await r.save();
    return r;
}

//move session to next stage; res: response
//return whether user response is valid
const handle = async function(from, smsRequest) {

    console.log("handle: ", from, smsRequest);
    const query = {number: from}
    var s = await Session.findOne(query)
    if (!s) {
        console.log("no session found, creating new session");
        s = await initializeSession(from);
    }
    if (s.stage == 0) { //user sends initial text
        send.sendAskLocation(from);
    } else if (s.stage == 1) { //user sends location preference
        var locList = parseReqNumber(smsRequest);
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
        var r = await createMatchRequest(s);
        var matchingNumber = await match(r);
        if (matchingNumber) {
            s.stage += 1; //move directly to stage 4
            var matchingSession = await Session.findOne({number: matchingNumber});
            matchingSession.stage += 1; //move matching session to stage 4
            await matchingSession.save();

            send.sendWaitingMatched(from, matchingSession.number);
            send.sendWaitingMatched(matchingSession.number, from);

        } else {
            send.sendWaitingForMatch(from);    
        }
    } else if (s.stage == 3) { //match not found
        send.sendWaitingForMatch(from);
        return 0;
    } else if (s.stage == 4) { //user sends RSVP message
        
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
    } else if (s.stage == 5) { //reminder
        //TODO
    } else if (s.stage == 6) { //survey
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
    await s.save();
    return 0;
}






module.exports = {handle}