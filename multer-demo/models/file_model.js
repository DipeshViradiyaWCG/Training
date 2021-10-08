const mongoose = require('mongoose');

// const fileSchema = mongoose.Schema({
//     createdAt : {
//         type : Date,
//         default : Date.now(),
//     },
//     f_name : {
//         type : String,
//         required : [true, "Upload file must have a name"],
//     },
// });

module.exports = mongoose.model('MulterDemo', mongoose.Schema({
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    f_name : {
        type : String,
        required : [true, "Upload file must have a name"],
    },
}));