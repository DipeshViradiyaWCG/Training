const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    user_ref : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userapi'
    },
    products_ref : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'productapi'
    }]
});

module.exports = mongoose.model("orderapi", orderSchema);