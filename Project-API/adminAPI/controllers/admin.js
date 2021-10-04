const admin_model = require("../models/admin_model");

exports.admin_get = function (req, res, next) {
    res.render("index");
};

exports.admin_post = function(req, res, next){
    var a_username = req.body.username;
    var a_password = req.body.password;
    admin_model.findOne({admin_username : a_username}).lean().then((admin) => {
        if(admin.admin_password == a_password){
            req.session.isAdmin = true;
            res.redirect('/dashboard');
        } else {
            res.send("Wrong credentials");
        }
    }).catch((err) => {
        throw err;
    });
};

exports.add_admin_get = function (req, res, next) {
    res.render("add-admin");
};

exports.add_admin_post = function (req, res, next) {
    console.log(req.body);
    var admin_add_data = {
        admin_name : req.body.aname,
        admin_username : req.body.ausername,
        admin_password : req.body.apassword
    }
    new admin_model(admin_add_data).save().then(() => {
        res.redirect("/dashboard");
    }).catch((err) => {
        throw err;
    });
};