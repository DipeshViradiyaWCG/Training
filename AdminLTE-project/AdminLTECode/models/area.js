const mongoose = require("mongoose");

const areaSchema = mongoose.Schema({
  areaname: String,
  _city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MiniPCity",
  },
});

module.exports = mongoose.model("MiniPArea", areaSchema);
