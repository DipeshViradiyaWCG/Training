const user_model = require("../models/user_model");

exports.login_user_post = function(req, res, next){
        var u_email = req.body.email;
        var u_password = req.body.password;
        user_model.findOne({email : u_email}).then((user)=>{
            if(!user)
            {
                return res.redirect("/signup");
            }
            if(u_password != user.password)
            {
                return res.send("Either username or password is wrong...");
            }
            // console.log("user" + JSON.stringify(user));
            
            req.session.uid = user._id;
            res.redirect("/show")

        }).catch((err)=>{
            throw err;
        })
    // userdata.save().then((data) => {
    //     res.redirect('/show');
    // }).catch((err) => {
    //     res.redirect('/');
    // });
};