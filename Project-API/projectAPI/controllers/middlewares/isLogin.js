exports.isLogin = function(req,res,next){
    if(req.session.uid){
        return next();
    } else {
        req.session.destroy(() => {
            res.redirect('/user/login');
        });
    }
};

// exports.userExists = function(req) {
//     if(req.session.uid)
//         return true; 
//     return false;
// };