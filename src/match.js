const MatchRequest = require("../schema/matchRequest");

const match = function(request) {
    var locList = request.data.location;
    var timeList = request.data.timeSlot;
    var reqDate = request.date;
    console.log("attempting to match: ", locList, timeList);
    var match = await MatchRequest.findOne({data: {location: {$in: locList}, timeSlot: {$in: timeList}, date: reqDate}})
    if (match) {
        request.matchingRequstID = match._id;
        match.matchingRequstID = request._id;
        await match.save();
        await request.save();
    } else {
        return 0;
    }
    return match.number;
}

module.export = match;