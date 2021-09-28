const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    product_name : String,
    product_category : String,
    price : Number,
    product_desc : String
});

module.exports = mongoose.model("product", productSchema);