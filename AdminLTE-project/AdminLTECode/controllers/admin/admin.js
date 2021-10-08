const adminModel = require("../../models/admin");

exports.adminSignupPost = function (req, res, next) {
    new adminModel({
        name : req.body.name,
        email : req.body.email,
        username : req.body. username,
        password : req.body.password
    }).save((err, data) => {
        if(err) 
            throw err;
        else{
            req.session.adminId = data._id;
            res.redirect("/admin/dashboard");
        }
    });
};

exports.adminLoginPost = function (req, res, next) {
    var a_email = req.body.email;
    var a_password = req.body.password;

    adminModel.findOne({email : a_email}).then((admin) => {
        if((!admin) || (admin.password != a_password)) 
            res.redirect("/admin/login");
        else {
            req.session.adminId = admin._id;
            res.redirect("/admin/dashboard");
        }
    }).catch((err) => {
        throw err;
    });
};