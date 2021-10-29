const mongoose = require('mongoose');

module.exports = mongoose.model('chatappusers', mongoose.Schema({
    FirstName : String,
    LastName : String,
    Age : Number
}));