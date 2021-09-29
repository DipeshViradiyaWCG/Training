var express = require('express');
var router = express.Router();
const product_model = require("../models/product_model");
const {add_product_get,add_product_post} = require("../controllers/product_controllers/add_product");
const {edit_product_get, edit_product_post} = require("../controllers/product_controllers/edit_product");
const {delete_product_get} = require("../controllers/product_controllers/delete_product");
const {read_data, user_profile_get} = require("../controllers/show-data");
const {signup_user_post, signup_user_get} = require("../controllers/signup-user");
const {login_user_post} = require("../controllers/login-user");
const {logout_user_get} = require("../controllers/logout-user");
const {change_password_get, change_password_post} = require("../controllers/change-password.js");
const {isLogin} = require("../controllers/middlewares/isLogin");
const {isAdmin} = require("../controllers/middlewares/isAdmin");
const {forgot_password_get, forgot_password_post} = require("../controllers/forgot-password.js");
const {admin_get, admin_post} = require("../controllers/admin");
const {show_electronics_get, show_grooming_get} = require("../controllers/product_controllers/show_product");


// function isLogin(req,res,next)
// {
//     if(req.session.uid)
//     {
//         return next()
//     }
//     res.redirect("/")
// }


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/', login_user_post);
router.get('/logout', logout_user_get);

router.get('/change-password', isLogin, change_password_get);
router.post('/change-password', isLogin, change_password_post);
router.get('/forgot-password', forgot_password_get);
router.post('/forgot-password', forgot_password_post);
router.get('/user-profile', isLogin, user_profile_get);

router.get('/admin', admin_get);
router.post('/admin', admin_post);

router.get('/show', isLogin, read_data);
router.get('/signup', signup_user_get);
router.post('/signup', signup_user_post);

// product routes...
router.get('/add-product', isLogin, add_product_get);
router.post('/add-product', isLogin, add_product_post);
router.get('/edit-product/:id', isAdmin, edit_product_get);
router.post('/edit-product/:id', isAdmin, edit_product_post);
router.get('/delete-product/:id', isAdmin, delete_product_get);
router.get('/show/electronics', isLogin, show_electronics_get);
router.get('/show/grooming', isLogin, show_grooming_get);

module.exports = router;
