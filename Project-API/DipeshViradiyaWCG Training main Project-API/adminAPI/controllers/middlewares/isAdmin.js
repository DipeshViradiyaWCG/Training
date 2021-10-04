exports.isAdmin = function(req,res,next){
    if(req.session.isAdmin){
        return next();
    } else {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
};