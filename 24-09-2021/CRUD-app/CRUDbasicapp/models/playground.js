const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playGroundSchema = new Schema({
    name : String,
    age : Number,
    mixDataObject : {
        type : mongoose.Schema.Types.Mixed
    },
    mixDataArray : [
        {
            type : mongoose.Schema.Types.Mixed
        }
    ]
}, );

module.exports = mongoose.model("mongopracticedemo", playGroundSchema);