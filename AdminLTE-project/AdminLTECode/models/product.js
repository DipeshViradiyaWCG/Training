const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productname: String,
  productdetail: String,
  productprice: Number,
  productimage: String,
  _subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MiniPSubcategory",
  },
});

module.exports = mongoose.model("MiniPProduct", productSchema);
