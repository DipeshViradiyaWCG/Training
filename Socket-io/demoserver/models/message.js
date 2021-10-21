const mongoose = require("mongoose");

const msgSchema = mongoose.Schema({
    _sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'SocketPUser'
    },
    _receiver : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'SocketPUser'
    }],
    msgdata : String,
    
},{timestamps : true});

module.exports = mongoose.model("SocketPMsg", msgSchema);