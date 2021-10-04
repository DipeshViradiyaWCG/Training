const user_model = require("../../models/user_model");
const nodemailer = require('nodemailer');

// const userExists = require("../middlewares/isLogin");


exports.user_profile_get = function (req, res, next) {
    user_model.findById(req.session.uid).lean().then((user) => {
        console.log(user);
        res.render("profile", {userdata : user, userExist : req.session.uid ? true : false});
    }).catch((err) => {
        throw err;
    });
};


exports.user_change_password_get = function (req, res, next) {
    res.render("change-password", {userExist : req.session.uid ? true : false});
};

exports.user_change_password_post = function (req, res, next) {
    var u_oldpass = req.body.oldpass;
    var u_newpass = req.body.newpass;
    var u_repass = req.body.repass;
    console.log(u_oldpass + " " + u_newpass + " " + u_repass);

    var u_pass;
    if(req.session.uid){
        user_model.findById(req.session.uid).then((user) => {
            u_pass = user.u_password;
            if(u_oldpass == u_pass){
                if(u_newpass == u_repass){
                    user_model.findById(req.session.uid).then((user)=>{
                        user.u_password = u_newpass;
                        user.save().then(()=>{
                            res.redirect("/user/profile");
    
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
        res.redirect("/user/logout");
    }
};

exports.user_forgot_password_get = function (req, res, next) {
    res.render("forgot-password", {userExist : req.session.uid ? true : false});
};

exports.user_forgot_password_post = function (req, res, next) {
    
    user_model.findOne({u_email : req.body.email}).then((user) => {
        let transporter = nodemailer.createTransport({
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
            text : user.u_password,
          };
        
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.render("forgot-password", {
                error: "Your mail could not be sent due to some issue, Try again later please...",
                isError: true,
              });
            } else {
              console.log("Email has been sent: " + info.response);
              res.render("forgot-password", {
                success: "Mail Sent Successfully",
                isSuccess: true,
              });
            }
          });

    }).catch((err) => {
        if(err)
            throw err;
    })
};