const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategorySchema = new Schema({
    subcategory_name : String,
    _category : {
        type: mongoose.Types.ObjectId, 
        ref: 'category'
    }
});

module.exports = mongoose.model("subcategory", subcategorySchema);