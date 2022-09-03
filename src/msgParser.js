var {locations, timeSlots} = require('./send.js');

//take a message string and extract a list of unique single-digit integers from it
const parseReqNumber =  function (message) {
    var numList = [];
    for (var i = 0; i < message.length; i++) {
        var c = message.charAt(i);
        if (c >= '0' && c <= '9') {
            var num = parseInt(c);
            if (!numList.includes(num)) {
                numList.push(num);
            }
        }
    }
    return numList;
}

//take a message string and extract a boolean value from it, return null if message is invalid
const parseReqYesNo =  function (smsRequest) {
    if (smsRequest.toLowerCase().includes("yes")) {
        return true;
    } else if (smsRequest.toLowerCase().includes("no")) {
        return false;
    }
    return null;
}

const parseReqSurvey =  function (smsRequest) {
    return;
}



module.exports = {parseReqNumber, parseReqYesNo, parseReqSurvey}