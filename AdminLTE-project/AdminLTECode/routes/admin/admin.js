var express = require('express');
var router = express.Router();

const { adminSignupPost, adminLoginPost } = require('../../controllers/admin/admin');

//Models
const adminModel = require("../../models/admin");

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('admin/account/login', {layout: 'loginSignup.hbs'});
});

router.get('/signup', function(req, res, next) {
    res.render('admin/account/signup', {layout: 'loginSignup.hbs'});
});

router.post('/signup', adminSignupPost);

router.post('/login', adminLoginPost);

router.get('/dashboard', function(req, res, next) {
    res.render('admin/account/dashboard');
});

// router.get

module.exports = router;