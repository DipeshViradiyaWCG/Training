const product_model = require("../../models/product_model");
const category_model = require("../../models/category_model");
const user_model = require("../../models/user_model");
const order_model = require("../../models/order_model");

exports.user_login_get = function (req, res, next) {
    res.render("login");
};

exports.user_logout_get = function (req, res, next) {
    req.session.destroy();
    res.redirect("/");
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
        fileobj.mv('/home/webcodegenie/Documents/WCG dipesh/Training 2021 codes/Aug - Sept/Training/Project-API/projectAPI/public/images/'+fileobj.name, function (err) {
            if (err)
                return res.send("File not uploaded...data");
        });
    });
    new user_model(user_add_data).save((err, data) => {
        if (err)
            throw err;
        else {
            // console.log(data);
            new order_model({user_ref : data._id}).save((err, order_data) => {
                if(err)
                    throw err;
                req.session.uid = data._id;
                req.session.ugender = data.u_gender;
                res.redirect('/');
            });
        }
    });
};

exports.user_login_post = function (req, res, next) {
    var u_email = req.body.email;
    var u_password = req.body.password;

    user_model.findOne({u_email : u_email}).then((user) => {
        if((!user) || (user.u_password != u_password)) 
            res.redirect("/user/login");
        else {
            req.session.ugender = user.u_gender;
            req.session.uid = user._id;
            res.redirect("/");
        }
    }).catch((err) => {
        throw err;
    });
};