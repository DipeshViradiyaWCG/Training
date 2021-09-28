const user_model = require("../models/user_model");
const nodemailer = require('nodemailer');


exports.forgot_password_get = function (req, res, next) {
    res.render('forgot-password');
};

exports.forgot_password_post = function (req, res, next) {
    user_model.findOne({email : req.body.email}).then((user) => {
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
            text : user.password,
          };
        
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.render("index", {
                error: "Your mail could not be sent due to some issue, Try again later please...",
                isError: true,
              });
            } else {
              console.log("Email has been sent: " + info.response);
              res.render("index", {
                success: "Mail Sent Successfully",
                isSuccess: true,
              });
            }
          });

    }).catch((err) => {
        if(err)
            throw err;
    })
    
    // res.render('forgot-password');
};