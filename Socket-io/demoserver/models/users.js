const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : String,
    socketId : String
});

module.exports = mongoose.model("SocketPUser", userSchema);