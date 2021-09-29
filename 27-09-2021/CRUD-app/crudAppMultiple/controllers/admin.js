// const admin = require("../models/admin");

exports.admin_get = function (req, res, next) {
    res.render("admin");
};

exports.admin_post = function(req, res, next){
    var a_username = req.body.username;
    var a_password = req.body.password;
    console.log(a_username + " " + a_password);
    
    if(a_username == "admin" && a_password == "admin"){
        req.session.isAdmin = true;
        // req.session.uid = "uid";
        res.redirect('/show');
    } else {
        res.redirect('/');
    }
};