const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    product_name : String,
    product_category : {
        type : Schema.Types.ObjectId,
        ref : 'categories'
    },
    price : Number,
    product_desc : String,
    product_img : String,
    gender_ref : String
});

module.exports = mongoose.model("productapi", productSchema);