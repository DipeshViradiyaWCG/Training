var express = require('express');
var router = express.Router();

const {user_login_get, user_signup_get, user_signup_post, user_login_post} = require("../controllers/user_controllers/user_login_signup");

router.get('/login', user_login_get);
router.get('/signup', user_signup_get);

router.post('/login', user_login_post);
router.post('/signup', user_signup_post);


module.exports = router;