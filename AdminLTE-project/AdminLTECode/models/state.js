const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  statename: String,
});

module.exports = mongoose.model("MiniPState", stateSchema);