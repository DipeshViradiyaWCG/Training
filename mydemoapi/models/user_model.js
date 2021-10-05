const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    u_name: String,
    email: String
});

module.exports = mongoose.model('UserDemoApi', userSchema);