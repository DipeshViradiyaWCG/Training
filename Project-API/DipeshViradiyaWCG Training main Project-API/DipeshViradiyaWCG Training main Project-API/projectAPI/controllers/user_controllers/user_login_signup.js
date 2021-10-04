const product_model = require("../../models/product_model");
const category_model = require("../../models/category_model");
const user_model = require("../../models/user_model");

exports.user_login_get = function (req, res, next) {
    res.render("login");
};

exports.user_signup_get = function (req, res, next) {
    res.render("signup");
};

exports.user_signup_post = function (req, res, next) {
    // console.log(req.body);
    // console.log(req.files.profilepic);
    var fileobj = req.files.profilepic;
    var user_add_data = {
        u_name : req.body.name,
        u_email : req.body.email,
        u_password : req.body.password,
        u_address : req.body.address,
        u_gender : req.body.gender,
        u_monumber : req.body.monumber,
        u_profilepic : fileobj.name
    }
    fileobj.mv('public/images/'+fileobj.name, function (err) {
        if (err)
            return res.send("File not uploaded...public");
        fileobj.mv('D:/WCG/project-api-demo/DipeshViradiyaWCG Training main Project-API/adminAPI/public/images/'+fileobj.name, function (err) {
            if (err)
                return res.send("File not uploaded...data");
        });
    });
    new user_model(user_add_data).save((err, data) => {
        if (err)
            throw err;
        else {
            // console.log(data);
            res.redirect('/products');
        }
    });
};

exports.user_login_post = function (req, res, next) {
    var u_email = req.body.email;
    var u_password = req.body.password;
};