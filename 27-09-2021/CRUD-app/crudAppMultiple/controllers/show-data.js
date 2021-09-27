const student_model = require("../models/student_model");
const user_model = require("../models/user_model");



//Read student
exports.read_data = function(req, res, next){
    if(req.session.uid)
        console.log("session of id exist" + req.session.id);
    user_model.findOne({id : req.session.id}).then((user) => {
        if(!user)
            res.redirect('/');
        else {
            student_model.find().lean().then((data) => {
                // console.log(data);
                res.render('show', {studentdata : data});
            }).catch((err) => {
                throw err;
            });
        }
    });
};