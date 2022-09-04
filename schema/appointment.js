const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
    appointmentId: {type: String, required: true},
    numbers:     { type: [Number], required: true },
    requests:    { type: [String], required: true},
    time:        { type: Date, required: true},
    location:    { type: String, required: true},
    reminded:    { type: Boolean, default: false},
    confirmed:   { type: Boolean, default: false}
  });

const Appointment = mongoose.model('Appointment', appointmentSchema);

const AppointmentArc = mongoose.model('AppointmentArc', appointmentSchema);

const moveAppointmentToArchive = async function(appointment) {
    var arc = new AppointmentArc(appointment.toJSON());
    await arc.save();
    await Appointment.deleteOne({appointmentId: appointment.appointmentId});
}


module.exports = {Appointment, AppointmentArc, moveAppointmentToArchive}