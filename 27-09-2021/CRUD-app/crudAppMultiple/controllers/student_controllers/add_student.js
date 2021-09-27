const student_model = require("../../models/student_model");

//Add student
exports.add_student_get = function(req, res, next){
    res.render('student-views/add-student');
};

exports.add_student_post = function(req, res, next){
    var student_add_data = {
        first_name : req.body.firstname,
        last_name : req.body.lastname,
        class : req.body.class,
        stream : req.body.stream
    }

    new student_model(student_add_data).save((err, data) => {
        if (err)
            throw err;
        else {
            console.log(data);
            res.redirect('/show');
        }
    });
    // res.render('student-views/add-student');
};