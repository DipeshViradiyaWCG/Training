var express = require('express');
var router = express.Router();

const {user_login_get, user_signup_get, user_signup_post, user_login_post, user_logout_get} = require("../controllers/user_controllers/user_login_signup");
const {user_profile_get, user_change_password_get, user_change_password_post, user_forgot_password_get, user_forgot_password_post} = require("../controllers/user_controllers/user_profile");
const {isLogin} = require("../controllers/middlewares/isLogin");
const {user_cart_get} = require("../controllers/cart_controllers/user_cart")

router.get('/login', user_login_get);
router.get('/signup', user_signup_get);
router.get('/logout', user_logout_get);
router.get('/change-password', user_change_password_get);
router.post('/change-password', user_change_password_post);
router.get('/forgot-password', user_forgot_password_get);
router.post('/forgot-password', user_forgot_password_post);



user_data

router.post('/login', user_login_post);
router.post('/signup', user_signup_post);

router.get('/profile', user_profile_get);

router.get('/cart', isLogin, user_cart_get);


module.exports = router;