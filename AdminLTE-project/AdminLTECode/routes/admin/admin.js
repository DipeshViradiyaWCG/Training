var express = require('express');
var router = express.Router();
const { check, validationResult, param } = require('express-validator');
const adminModel = require("../../models/admin");


const { adminSignupPost, adminLoginPost, getDisplayAdmins, getChangePassword, postChangePassword, postForgotPassword } = require('../../controllers/admin/admin');

router.get('/login', function(req, res, next) {
  res.render('admin/account/login', {layout: 'loginSignup.hbs'});
});

router.get('/signup', function(req, res, next) {
    res.render('admin/account/signup', {layout: 'loginSignup.hbs'});
});

router.post('/signup',[
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is necessary")
    .isAlpha()
    .withMessage("name can not contain numbers")
    .isLength({min : 3})
    .withMessage("Name should be atleast 3 characters"),
  check('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username is necessary")
    .isAlpha()
    .withMessage("User name can not contain numbers")
    .isLength({min : 3})
    .withMessage("Username should be atleast 3 characters"),
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage("E mail is necessary")
    .isEmail()
    .withMessage("Email is invalid.")
    .isLength({min : 10})
    .withMessage("Email should be atleast 10 characters long")
    .custom(async (value) => {
      let adminObj = await adminModel.findOne({email : value}).lean();
      if(adminObj)
        throw new Error("Entered email account already exists...");
      return true;
    }),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is necessary")
    .isLength({min : 4})
    .withMessage("Should be 4 characters long")
], adminSignupPost);

router.post('/login', [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage("E mail is necessary")
    .isEmail()
    .withMessage("Email is invalid.")
    .isLength({min : 8})
    .withMessage("Email should be atleast 8 characters long")
    .custom(async (value, {req}) => {
      let adminObj = await adminModel.findOne({email : value}).lean();
      if(adminObj.password != req.body.password)
        throw new Error("Either email or password is wrong");
    }),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is necessary")
    .isLength({min : 5})
    .withMessage("Should be 5 characters long")
    .custom(async (value, {req}) => {
      let adminObj = await adminModel.findOne({email : req.body.email}).lean();
      if(adminObj.password != value)
        throw new Error("Either email or password is wrong");
    })
], adminLoginPost);

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