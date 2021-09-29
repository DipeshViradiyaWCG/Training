const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    category_name : String
});

module.exports = mongoose.model("category", categorySchema);