const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  usergender: String,
  useremail: String,
  userpassword: String,
  useraddress: String,
  userprofilepic: String,
  _area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MiniPArea",
  },
});

module.exports = mongoose.model("MiniPUser", userSchema);
