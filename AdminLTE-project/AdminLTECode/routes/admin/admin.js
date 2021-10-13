var express = require('express');
var router = express.Router();

const { adminSignupPost, adminLoginPost, getDisplayAdmins, getChangePassword, postChangePassword, postForgotPassword } = require('../../controllers/admin/admin');

router.get('/login', function(req, res, next) {
  res.render('admin/account/login', {layout: 'loginSignup.hbs'});
});

router.get('/signup', function(req, res, next) {
    res.render('admin/account/signup', {layout: 'loginSignup.hbs'});
});

router.post('/signup', adminSignupPost);

router.post('/login', adminLoginPost);

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect("/admin/login");
});

router.get('/dashboard', function(req, res, next) {
    res.render('admin/account/dashboard');
});

router.get("/display", getDisplayAdmins);
router.get("/changepassword", getChangePassword);
router.post("/changepassword", postChangePassword);

router.get("/forgotpassword", function (req, res, next) {
  res.render("admin/account/forgotpassword",  {layout: 'loginSignup.hbs'});
});

router.post("/forgotpassword", postForgotPassword);

module.exports = router;