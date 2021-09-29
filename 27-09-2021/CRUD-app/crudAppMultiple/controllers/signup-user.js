const user_model = require("../models/user_model");

//Read product

exports.signup_user_get = function (req, res, next) {
    res.render('signup');  
};

exports.signup_user_post = function(req, res, next){
    console.log(req.files);
    var fileobj = req.files.profilepic;
// 
    var userdata = new user_model({
        first_name : req.body.firstname,
        last_name : req.body.lastname,
        email : req.body.email,
        password : req.body.password,
        profilepic : fileobj.name
    });

  
    fileobj.mv('public/images/'+fileobj.name, function (err) {
        if (err)
          return res.send("File not uploaded...");
    });
    userdata.save().then((data) => {
        req.session.uid = data._id;
        res.redirect('/show');
    }).catch((err) => {
        res.redirect('/');
    });
};