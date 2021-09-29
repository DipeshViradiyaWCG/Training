exports.isLogin = function(req,res,next){
    console.log("condition" + req.session.uid || req.session.isAdmin);
    console.log(req.session.uid);
    console.log(req.session.isAdmin);
    if(req.session.isAdmin){
        console.log("isadmin");
        return next();
    } else if(req.session.uid){
        console.log("uid");
        return next();
    } else {
        console.log("else");
        res.redirect("/");
    }
    // if(req.session.uid || req.session.isAdmin)
    //     return next();
    // res.redirect("/");
};

// function isLogin(req,res,next)
// {
//     if(req.session.uid)
//     {
//         return next()
//     }
//     res.redirect("/")
// }