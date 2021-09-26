const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_name : String,
    user_mobile : Number
});

module.exports = mongoose.model("user", userSchema);