const student_model = require("../../models/student_model");

//Read student

exports.delete_student_get = function (req, res, next) {
    student_model.findByIdAndRemove(req.params.id).then((data) => {
        console.log(data);
        res.redirect('/show');
        
    }).catch((err) => {
        throw err;
    });
};