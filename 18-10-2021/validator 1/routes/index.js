var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();



/* GET home page. */
router.get('/', (req, res) => { res.render('index'); });

router.post('/',[
  check('name').isLength({min : 3}).withMessage("Name should be atleast 3 characters"),
  check('email').isLength({min : 10}).withMessage("Email should be atleast 10 characters long"),
  check('number').isLength({min : 10, max : 10}).withMessage("number should be exactly 10 characters long"),
  check('password').not().isEmpty().isLength({min : 5}).withMessage("Password is necessary and Should be 5 characters long")
] ,function(req, res, next) {
    const errors = validationResult(req).array();
    // if(errors){
    //   req.session.errors = errorsobj.errors;
    //   // req.session.success = errors ? false : true;
    // }
    let success = errors.length > 0 ? false :true;
    res.render("index", {errors , success});
    console.log(errors);
});

router.get('/bootstrap', (req, res) => { res.render('index2'); });

router.post('/bootstrap', [
  check('name')
    .isAlpha()
    .withMessage("name can not contain numbers")
    .isLength({min : 3})
    .withMessage("Name should be atleast 3 characters"),
  check('email')
    .isEmail()
    .withMessage("Email is invalid.")
    .isLength({min : 10})
    .withMessage("Email should be atleast 10 characters long"),
  check('password')
    .not()
    .isEmpty()
    .withMessage("Password is necessary")
    .isLength({min : 5})
    .withMessage("Should be 5 characters long"),
  check('number')
    .not()
    .isEmpty()
    .withMessage("Phone number is necessary")
    .isMobilePhone().
    isLength({min : 10, max : 10})
    .withMessage("Not a valid phone number my friend...")

], function (req, res) {
  const errors1 = validationResult(req).array();
  let success = errors1.length > 0 ? false :true;
  console.log(errors1);

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

  console.log(errs);

  res.render("index2", {errs});
  
});


module.exports = router;
