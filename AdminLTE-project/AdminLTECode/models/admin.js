const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    name : String,
    email : String,
    username : String,
    password : String

});

module.exports = mongoose.model("MiniPAdmin", adminSchema);