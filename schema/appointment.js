const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
    appointmentId: {type: String, required: true},
    numbers:     { type: [Number], required: true },
    requests:    { type: [String], required: true},
    time:        { type: Number, required: true},
    location:    { type: String, required: true},
    reminded:    { type: Boolean, default: false}
  },{ collection: 'Appointments'});

const Appointment = mongoose.model('Appointment', requestSchema);

module.exports = Appointment