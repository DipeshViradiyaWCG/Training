const student_model = require("../../models/student_model");

//Read student

exports.edit_student_get = function (req, res, next) {
    student_model.findById(req.params.id).lean().then((data) => {
        // console.log(data);
        res.render('student-views/edit-student', {studentdata : data});
        
    }).catch((err) => {
        throw err;
    });
};

exports.edit_student_post = function(req, res, next){
    student_model.findByIdAndUpdate(req.params.id, {
    
        first_name : req.body.firstname,
        last_name : req.body.lastname,
        class : req.body.class,
        stream : req.body.stream
    
    }).then((data) => {
        // console.log(data);
        res.redirect('/show');
    }).catch((err) => {
        throw err;
    });
};