exports.isLogin = function(req,res,next){
    if(req.session.uid)
        return next();
    res.redirect("/");
};

// function isLogin(req,res,next)
// {
//     if(req.session.uid)
//     {
//         return next()
//     }
//     res.redirect("/")
// }