const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    admin_name : String,
    admin_username : String,
    admin_password : String

});

module.exports = mongoose.model("adminapi", adminSchema);