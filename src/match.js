const {MatchRequest} = require("../schema/matchRequest");

const match = async function(request) {
    var locList = request.data.location;
    var timeList = request.data.timeSlot;
    var reqDate = request.date;
    console.log("attempting to match: ", locList, timeList);
    var match = await MatchRequest.findOne({"data.location": {$in: locList}, "data.timeSlot": {$in: timeList},
    "requestId": {$ne: request.requestId}, "matchingRequstID":{$exist:false}} );
    console.log("returned match:", match)
    if (match) {

        request.matchingRequstID = match._id;
        match.matchingRequstID = request._id;
        await match.save();
        await request.save();

    } else {
        return 0;
    }
    return match;
}

module.exports = match;