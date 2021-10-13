const adminModel = require("../../models/admin");

const nodemailer = require('nodemailer');

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

exports.getDisplayAdmins = async function (req, res, next) {
    let admins = await adminModel.find().lean();
    res.render("admin/account/display", {admins});
};

exports.getChangePassword = async function (req, res, next) {
    res.render("admin/account/changepassword");
};

exports.postChangePassword = async function (req, res, next) {
    var u_oldpass = req.body.oldpass;
    var u_newpass = req.body.newpass;
    var u_repass = req.body.repass;

    var u_pass;
    if(req.session.adminId){
        adminModel.findById(req.session.adminId).then((admin) => {
            u_pass = admin.password;
            if(u_oldpass == u_pass){
                if(u_newpass == u_repass){
                    adminModel.findById(req.session.adminId).then((admin)=>{
                        admin.password = u_newpass;
                        admin.save().then(()=>{
                            res.redirect("/admin/dashboard");
    
                        }).catch((err)=>{
                            console.log(err);
                        })
                    }).catch((err)=>console.log(err));
                } else {
                    res.json({
                        msg : "Please enter same password in re-enter password..."
                    });
                }
            } else {
                res.json({
                    msg : "Invalid request for invalid user..."
                });
            }
        }).catch((err) => {
            throw err;
        });
    } else {
        res.redirect("/admin/logout");
    }
};

exports.postForgotPassword = async function (req, res, next) {

    try {
        let adminobj = await adminModel.findOne({email : req.body.email});
        let transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "dipesh.fakemail@gmail.com", // generated ethereal user
              pass: "dipeshfake", // generated ethereal password
            },
        });
        
        var mailOptions = {
            from: '"Dipesh\'s fake account" <dipesh.fakemail@gmail.com>',
            to: req.body.email,
            subject: "Forget password",
            text : adminobj.password,
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