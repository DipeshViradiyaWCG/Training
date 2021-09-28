const student_model = require("../models/student_model");
const user_model = require("../models/user_model");



//Read student
exports.read_data = function(req, res, next){
    if(req.session.uid)
        // console.log("session of id exist" + req.session.uid);
    user_model.findOne({_id : req.session.uid}).then((user) => {
        if(!user)
            res.redirect('/');
        else {
            // console.log("user in show data"+user);
            student_model.find().lean().then((data) => {
                // console.log(data);
                // console.log("user in inner" + user);
                res.render('show', {studentdata : data});
            }).catch((err) => {
                throw err;
            });
        }
    }).catch((err) => {
        if(err)
            throw err;
    });
};

exports.user_profile_get = function (req, res, next) {
    user_model.findOne({_id : req.session.uid}).then((user) => {
        if(!user)
            res.redirect('/');
        else {
            console.log("user in show data"+user);
            res.render('profile', {first_name : user.first_name, last_name : user.last_name, email : user.email, password : user.password, profilepic : user.profilepic});  
        }
    }).catch((err) => {
        if(err)
            throw err;
    });
};