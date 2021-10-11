const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryname: String,
});

module.exports = mongoose.model("MiniPCategory", categorySchema);