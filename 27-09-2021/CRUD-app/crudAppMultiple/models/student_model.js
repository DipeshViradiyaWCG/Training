const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    first_name : String,
    last_name : String,
    class : Number,
    stream : String
});

module.exports = mongoose.model("student", studentSchema);