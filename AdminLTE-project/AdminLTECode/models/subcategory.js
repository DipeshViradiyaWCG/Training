const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
  subcategoryname: String,
  _category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MiniPCategory",
  },
});

module.exports = mongoose.model("MiniPSubcategory", subcategorySchema);
