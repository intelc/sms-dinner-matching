const Session = require("../schema/session");
const MatchRequest = require("../schema/matchRequest");
const {parseReqNumber, parseReqYesNo, parseReqSurvey} = require("./msgParser");
const match = require("./match");

const send = require("./send");
const {locations, timeSlots} = require("./send.js");
const {v4} = require('uuid');
const Appointment = require("../schema/appointment");

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

const createAppointment = async function (request1, request2) {
    var commonLocation = request1.data.location.filter(x => request2.data.location.includes(x))[0];
    var commonTime = request1.data.timeSlot.filter(x => request2.data.timeSlot.includes(x))[0];
    var baseDate = new Date();
    baseDate.setHours(17, 0, 0, 0);
    console.log("commontime: ", commonTime);
    // var appDate = baseDate + (commonTime - 1) * 1800000;
    baseDate.setMinutes(baseDate.getMinutes() + (commonTime - 1) * 30);
    // console.log("appDate: ", appDate);
    var a = new Appointment({   appointmentId: v4(),
                                requests: [request1.requestId, request2.requestId],
                                numbers: [request1.number, request2.number],
                                location: commonLocation,
                                time: baseDate
                            });
    request1.appointmentId = a.appointmentId;
    request2.appointmentId = a.appointmentId;
    await a.save();
    await request1.save();
    await request2.save();
    return a;
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
        //filter locList to remove invalid inputs larger than the size of locations list
        locList = locList.filter(x => x <= locations.length);
        if (!locList || locList.length < 1) {
            send.sendLocError(from);
            return -1;
        }
        await inputLocation(s, locList);
        send.sendAskTime(from, locList);
    } else if (s.stage == 2) { //user sends time preference
        var timeList = parseReqNumber(smsRequest);
        timeList = timeList.filter(x => x <= timeSlots.length);
        if (!timeList || locList.length < 1) {
            send.sendTimeError(from);
            return -1;
        }
        await inputTimeSlot(s, timeList);
        var r = await createMatchRequest(s);
        var matched = await match(r);
        if (matched) {
            var matchingNumber = matched.number
            s.stage += 1; //move directly to stage 4
            var matchingSession = await Session.findOne({number: matchingNumber});
            matchingSession.stage += 1; //move matching session to stage 4
            await matchingSession.save();

            var appointment = await createAppointment(r, matched);

            send.sendWaitingMatched(from, matchingSession.number, appointment);
            send.sendWaitingMatched(matchingSession.number, from, appointment);

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
    console.log("saved")
    await s.save();
    return 0;
}






module.exports = {handle}