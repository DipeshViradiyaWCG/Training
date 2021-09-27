const user_model = require("../models/user_model");

exports.logout_user_get = function(req, res, next){

        req.session.destroy((err) => {
            res.redirect('/');
        });
    
};