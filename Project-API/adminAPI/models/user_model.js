const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    u_name : String,
    u_email : String,
    u_password : String,
    u_address : String,
    u_gender : String,
    u_monumber : Number,
    u_profilepic : String,
    isActive : {
        type : Boolean,
        default : true
    }
});

module.exports = mongoose.model("userapi", userSchema);