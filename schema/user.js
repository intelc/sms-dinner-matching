const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    number:      { type: Number, required: true },
    date:        { type: Date, default: Date.now },

  });



const User = mongoose.model('User', userSchema);

module.exports = {User}