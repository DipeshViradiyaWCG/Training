const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  useremail: String,
  userpassword: String,
  userstatus : { type: Number, default: 0 },
  usermsgs : {
      type : Map,
      of : Array
  }
});

module.exports = mongoose.model("ChatAppUser", userSchema);