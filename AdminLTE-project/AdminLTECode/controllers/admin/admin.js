const adminModel = require("../../models/admin");
const {
    check,
    validationResult,
    param
} = require('express-validator');

const showError = require("../../utilities/showError");

const nodemailer = require('nodemailer');

// Add admin data to db
exports.adminSignupPost = async function (req, res, next) {
    const errorsSignup = validationResult(req).array();
    let success = errorsSignup.length > 0 ? false : true;

    let errs = {};
    for (let err of errorsSignup) {
        if (errs[err.param]) {
            errs[err.param].push(err.msg)
        } else {
            errs[err.param] = []
            errs[err.param].push(err.msg)
        }
    }

    try {
        let adminData = await adminModel.create(req.body);
        req.session.adminId = adminData._id;
        if (success)
            res.redirect("/admin/dashboard");
        else
            res.render("admin/account/signup", { layout: 'loginSignup.hbs',errs});
    } catch (error) {
        showError(error);
    }

    // new adminModel({
    //     name : req.body.name,
    //     email : req.body.email,
    //     username : req.body. username,
    //     password : req.body.password
    // }).save((err, data) => {
    //     if(err) 
    //         throw err;
    //     else{
    //         req.session.adminId = data._id;
    //         if(success)
    //             res.redirect("/admin/dashboard");
    //         else
    //             res.render("admin/account/signup", {layout: 'loginSignup.hbs' , errs});
    //     }
    // });
};

// Login route for admin
exports.adminLoginPost = async function (req, res, next) {

    const errorsLogin = validationResult(req).array();
    let success = errorsLogin.length > 0 ? false : true;

    let errs = {};
    for (let err of errorsLogin) {
        if (errs[err.param]) {
            errs[err.param].push(err.msg)
        } else {
            errs[err.param] = []
            errs[err.param].push(err.msg)
        }
    }

    var a_email = req.body.email;
    try {
        await adminModel.findOne({
            email: a_email
        });
    } catch (error) {
        showError(error);
    }

    if (success) {
        req.session.adminId = admin._id;
        res.redirect("/admin/dashboard");
    } else
        res.render("admin/account/login", {
            layout: 'loginSignup.hbs',
            errs
        });


    // var a_email = req.body.email;
    // var a_password = req.body.password;

    // adminModel.findOne({email : a_email}).then((admin) => {
    //     if((!admin) || (admin.password != a_password)) 
    //         res.redirect("/admin/login");
    //     else {
    //         req.session.adminId = admin._id;
    //         if(success)
    //             res.redirect("/admin/dashboard");
    //         else
    //             res.render("admin/account/login", {layout: 'loginSignup.hbs' , errs});
    //     }
    // }).catch((err) => {
    //     throw err;
    // });
};

// Get and render admin data 
exports.getDisplayAdmins = async function (req, res, next) {
    try {
        let admins = await adminModel.find().lean();
        res.render("admin/account/display", {
            admins
        });
    } catch (error) {
        showError(error);
    }
};

// Render change password form for admin
exports.getChangePassword = async function (req, res, next) {
    res.render("admin/account/changepassword");
};

// Change password of admin in db
exports.postChangePassword = async function (req, res, next) {
    let userOldpass = req.body.oldpass;
    let userNewpass = req.body.newpass;
    let userRepass = req.body.repass;

    let userPass;
    try {
        if (req.session.adminId) {
            let admin = await adminModel.findById(req.session.adminId).lean();
            userPass = admin.password;
            if (userOldpass == userPass) {
                if (userNewpass == userRepass) {
                    await adminModel.findByIdAndUpdate(req.session.adminId, {
                        password: userNewpass
                    });
                    res.redirect("/admin/dashboard");
                } else {
                    res.json({
                        msg: "Please enter same password in re-enter password..."
                    });
                }
            } else {
                res.json({
                    msg: "Invalid request for invalid user..."
                });
            }
        } else {
            res.redirect("/admin/logout");
        }
    } catch (error) {
        showError(error);
    }
    // var u_pass;
    // if(req.session.adminId){
    //     adminModel.findById(req.session.adminId).then((admin) => {
    //         u_pass = admin.password;
    //         if(u_oldpass == u_pass){
    //             if(u_newpass == u_repass){
    //                 adminModel.findById(req.session.adminId).then((admin)=>{
    //                     admin.password = u_newpass;
    //                     admin.save().then(()=>{
    //                         res.redirect("/admin/dashboard");

    //                     }).catch((err)=>{
    //                         console.log(err);
    //                     })
    //                 }).catch((err)=>console.log(err));
    //             } else {
    //                 res.json({
    //                     msg : "Please enter same password in re-enter password..."
    //                 });
    //             }
    //         } else {
    //             res.json({
    //                 msg : "Invalid request for invalid user..."
    //             });
    //         }
    //     }).catch((err) => {
    //         throw err;
    //     });
    // } else {
    //     res.redirect("/admin/logout");
    // }
};

// Mail user the password using email
exports.postForgotPassword = async function (req, res, next) {
    try {
        let adminobj = await adminModel.findOne({
            email: req.body.email
        });
        let transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "dipesh.fakemail@gmail.com",
                pass: "dipeshfake",
            },
        });

        var mailOptions = {
            from: '"Dipesh\'s fake account" <dipesh.fakemail@gmail.com>',
            to: req.body.email,
            subject: "Forget password",
            text: adminobj.password,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.render("admin/account/forgotpassword", {
                    layout: 'loginSignup.hbs',
                    error: "Your mail could not be sent due to some issue, Try again later please...",
                    isError: true,
                });
            } else {
                console.log("Email has been sent: " + info.response);
                res.render("admin/account/forgotpassword", {
                    layout: 'loginSignup.hbs',
                    success: "Mail Sent Successfully",
                    isSuccess: true,
                });
            }
        });

    } catch (error) {
        throw error;
    }

};