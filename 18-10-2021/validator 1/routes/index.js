var express = require('express');
const { check, validationResult, param } = require('express-validator');
var router = express.Router();

const bcrypt = require("bcryptjs");

const userModel = require("../models/user");


// To show same page errors
router.get('/', (req, res) => { res.render('index'); });

router.post('/',[
  check('name').isLength({min : 3}).withMessage("Name should be atleast 3 characters"),
  check('email').isLength({min : 10}).withMessage("Email should be atleast 10 characters long"),
  check('number').isLength({min : 10, max : 10}).withMessage("number should be exactly 10 characters long"),
  check('password').not().isEmpty().isLength({min : 5}).withMessage("Password is necessary and Should be 5 characters long")
] ,function(req, res, next) {
    const errors = validationResult(req).array();
    let success = errors.length > 0 ? false : true;
    res.render("index", {errors , success});
});

// To show field specific error
router.get('/bootstrap', (req, res) => { res.render('index2'); });

router.post('/bootstrap', [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is necessary")
    .isAlpha()
    .withMessage("name can not contain numbers")
    .isLength({min : 3})
    .withMessage("Name should be atleast 3 characters"),
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage("E mail is necessary")
    .isEmail()
    .withMessage("Email is invalid.")
    .isLength({min : 10})
    .withMessage("Email should be atleast 10 characters long"),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is necessary")
    .isLength({min : 8})
    .withMessage("Should be 8 characters long")
    .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    .withMessage("Entered password's strength is too weak - {should contain Uppercase letter, lowercase letter, numerical values, special characters}"),
  check('gender')
    .notEmpty()
    .withMessage("Gender is necessary")
    .isIn(['Male', 'male','Female','female','other','Other','m','M', 'f','F'])
    .withMessage("Use words like male , female, other"),
  check('number')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phone number is necessary")
    .isMobilePhone()
    .matches('[6-9]{1}[0-9]{9}')
    .withMessage("Entered number does not match with official pattern of indian phone numbers"),
  check('pancard')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Pan card number is necessary")
    .isAlphanumeric()
    .withMessage("PAN card number only contains alphabets and numbers")
    .matches('[A-Z]{5}[0-9]{4}[A-Z]{1}')
    .withMessage("Entered PAN card number does not match with official pattern provided by IND gov."),
  check('adhaarcard')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Adhaar card is necessary")
    .isNumeric()
    .withMessage("Adhaar card number can only contain Numbers")
    .matches('[0-9]{12}')
    .withMessage("Entered Adhaar card number does not match with official pattern provided by IND gov."),
  check('passport')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Passport number is necessary")
    .isAlphanumeric()
    .withMessage("Passport number only contains alphabets and numbers")
    .matches('^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$')    
    .withMessage("Entered Passport number does not match with official pattern provided by IND gov."),
  check('gst')
    .trim()
    .not()
    .isEmpty()
    .withMessage("GST number is necessary")
    .isAlphanumeric()
    .withMessage("GST number only contains alphabets and numbers")
    .matches('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')
    .withMessage("Entered GST number does not match with official pattern provided by IND gov."),
] , function (req, res) {
  const errors1 = validationResult(req).array();
  let success = errors1.length > 0 ? false :true;

  let errs = {};
  for(let err of errors1){
    if(errs[err.param])
    {
      errs[err.param].push(err.msg)
    }else{
      errs[err.param] = []
      errs[err.param].push(err.msg)
    }
  }

  res.render("index2", {errs, success});
  
});

// To show custom validator errors
router.get('/signup', (req, res) => { res.render('signup'); });

router.post('/signup', [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is necessary")
    .isAlpha()
    .withMessage("name can not contain numbers")
    .isLength({min : 3})
    .withMessage("Name should be atleast 3 characters"),
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
      let userObj = await userModel.findOne({email : value}).lean();
      if(userObj)
        throw new Error("Entered email account already exists...");
      return true;
    }),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is necessary")
    .isLength({min : 8})
    .withMessage("Should be 8 characters long")
    .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    .withMessage("Entered password's strength is too weak - {should contain Uppercase letter, lowercase letter, numerical values, special characters}")
],async function (req, res) {
  const errorsSignup = validationResult(req).array();
  let success = errorsSignup.length > 0 ? false :true;

  let errs = {};
  for(let err of errorsSignup){
    if(errs[err.param])
    {
      errs[err.param].push(err.msg)
    }else{
      errs[err.param] = []
      errs[err.param].push(err.msg)
    }
  }

  await userModel.create(req.body);

  // console.log(errs);

  res.render("signup", {errs, success});
  
});

// To show custom validator errors
router.get('/login', (req, res) => { res.render('login'); });

router.post('/login', [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage("E mail is necessary")
    .isEmail()
    .withMessage("Email is invalid.")
    .isLength({min : 10})
    .withMessage("Email should be atleast 10 characters long")
    .custom(async (value, {req}) => {
      let userObj = await userModel.findOne({email : value}).lean();
      if(!userObj)
        throw new Error("Entered email account does not exists...");
      if(userObj.password != req.body.password)
        throw new Error("Either email or password is wrong");
    }),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is necessary")
    .isLength({min : 8})
    .withMessage("Should be 8 characters long")
    .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    .withMessage("Entered password's strength is too weak - {should contain Uppercase letter, lowercase letter, numerical values, special characters}")
    .custom(async (value, {req}) => {
      let userObj = await userModel.findOne({email : req.body.email}).lean();
      if(!userObj)
        throw new Error("Entered email account does not exists...");
      if(userObj.password != value)
        throw new Error("Either email or password is wrong");
    })
], function (req, res) {
  const errorsSignup = validationResult(req).array();
  let success = errorsSignup.length > 0 ? false :true;

  let errs = {};
  for(let err of errorsSignup){
    if(errs[err.param])
    {
      errs[err.param].push(err.msg)
    }else{
      errs[err.param] = []
      errs[err.param].push(err.msg)
    }
  }

  res.render("login", {errs, success});

});

// APIs with custom validation - POST
router.post('/signupapi', [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is necessary")
    .isAlpha()
    .withMessage("name can not contain numbers")
    .isLength({min : 3})
    .withMessage("Name should be atleast 3 characters"),
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
      let userObj = await userModel.findOne({email : value}).lean();
      if(userObj)
        throw new Error("Entered email account already exists...");
      return true;
    }),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is necessary")
    .isLength({min : 8})
    .withMessage("Should be 8 characters long")
    .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    .withMessage("Entered password's strength is too weak - {should contain Uppercase letter, lowercase letter, numerical values, special characters}")
],async function (req, res) {
  const errorsSignup = validationResult(req).array();
  let success = errorsSignup.length > 0 ? false :true;
  console.log(errorsSignup);
  
  if(success){
    var salt = bcrypt.genSaltSync(10);
    req.body.password = await bcrypt.hashSync(req.body.password, salt);
    await userModel.create(req.body);
    res.json({msg : "Validated..."}).send();
  } else {
    let errs = {};
    for(let err of errorsSignup){
      if(errs[err.param] == undefined)
        errs[err.param] = []
      errs[err.param].length < 1 && errs[err.param].push(err.msg)
    }
    res.json({errs}).send();
  }
});

router.post('/loginapi/:email/:password', [
  param('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage("E mail is necessary")
    .isEmail()
    .withMessage("Email is invalid.")
    // .isLength({min : 10})
    // .withMessage("Email should be atleast 10 characters long")
    .custom(async (value, {req}) => {
      let userObj = await userModel.findOne({email : value}).lean();
      if(!userObj)
        throw new Error("Entered email account does not exists...");
    }),
  param('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is necessary")
    .isLength({min : 8})
    .withMessage("Should be 8 characters long")
    // .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    // .withMessage("Entered password's strength is too weak - {should contain Uppercase letter, lowercase letter, numerical values, special characters}")
    .custom(async (value, {req}) => {
      let userObj = await userModel.findOne({email : req.params.email}).lean();
      if(!bcrypt.compareSync(value, userObj.password))
        throw new Error("Either email or password is wrong");
    })
], function (req, res) {
  const errorsSignup = validationResult(req).array();
  let success = errorsSignup.length > 0 ? false :true;
  if(success){
    res.json({status : 0 ,msg : "Validated..."}).send()
  } else {
    let errs = {};
    for(let err of errorsSignup){
      if(errs[err.param] == undefined)
        errs[err.param] = []
      errs[err.param].length < 1 && errs[err.param].push(err.msg)
    }
    console.log(errs);
    res.json({status : 1 ,errs});
  }
});

//API in front end
router.get('/loginapitest', (req, res) => { res.render('logintest'); });


module.exports = router;
