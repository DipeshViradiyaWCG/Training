const user_model = require("../models/user_model");

exports.change_password_get = function (req, res, next) {
    res.render('change-password');  
};

exports.change_password_post = function(req, res, next){
    // console.log(req.body);
    var u_oldpass = req.body.oldpass;
    var u_newpass = req.body.newpass;
    var u_repass = req.body.repass;

    var u_pass;
    if(req.session.uid){
        user_model.findById(req.session.uid).then((user) => {
            u_pass = user.password;
            if(u_oldpass == u_pass){
                if(u_newpass == u_repass){
                    user_model.findById(req.session.uid).then((user)=>{
                        user.password = u_newpass;
                        user.save().then(()=>{
                            res.redirect("/show");
    
                        }).catch((err)=>{
                            console.log(err);
                        })
                    }).catch((err)=>console.log(err))
                    res.redirect('/show');
                    console.log("password changed");
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
        res.redirect("/logout");
    }

    //     var u_email = req.bodc.email;
    //     var u_password = req.body.password;
    //     user_model.findOne({email : u_email}).then((user)=>{
    //         if(!user)
    //         {
    //             return res.redirect("/signup");
    //         }
    //         if(u_password != user.password)
    //         {
    //             return res.send("Either username or password is wrong...");
    //         }
    //         console.log("user" + JSON.stringify(user));
            
    //         req.session.uid = user.id;
    //         res.redirect("/show")

    //     }).catch((err)=>{
    //         throw err;
    //     })
    // // userdata.save().then((data) => {
    // //     res.redirect('/show');
    // // }).catch((err) => {
    // //     res.redirect('/');
    // // });
};