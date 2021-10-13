const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  cityname: String,
  _state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MiniPState",
  },
});

module.exports = mongoose.model("MiniPCity", citySchema);
