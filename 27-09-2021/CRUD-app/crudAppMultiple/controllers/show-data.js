const product_model = require("../models/product_model");
const user_model = require("../models/user_model");



//Read product
exports.read_data = function(req, res, next){
    // if(req.session.uid)
        // console.log("session of id exist" + req.session.uid);
    if(req.session.uid){
        user_model.findOne({_id : req.session.uid}).lean().then((user) => {
            if(!user)
                res.redirect('/');
            else {
                // console.log("user in show data"+user);
                product_model.find().lean().then((data) => {
                    // console.log(data);
                    // console.log("user in inner" + user);
                    res.render('show', {productdata : data, btn_hidden : "visually-hidden"});
                }).catch((err) => {
                    throw err;
                });
            }
        }).catch((err) => {
            if(err)
                throw err;
        });
    } else {
        product_model.find().lean().then((data) => {
            // console.log(data);
            // console.log("user in inner" + user);
            res.render('show-admin', {productdata : data, btn_hidden : ""});
        }).catch((err) => {
            throw err;
        });
    }
};

exports.user_profile_get = function (req, res, next) {
    if(req.session.uid){
        user_model.findOne({_id : req.session.uid}).lean().then((user) => {
            if(!user)
                res.redirect('/');
            else {
                console.log("user in show data"+user);
                // res.render('profile', {first_name : user.first_name, last_name : user.last_name, email : user.email, password : user.password, profilepic : user.profilepic});  
                res.render('profile', {user : user});
            }
        }).catch((err) => {
            if(err)
                throw err;
        });
    } else {
        res.render('admin-profile');
    }
};