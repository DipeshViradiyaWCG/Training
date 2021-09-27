var express = require('express');
var router = express.Router();
const student_model = require("../models/student_model");
const {add_student_get,add_student_post} = require("../controllers/student_controllers/add_student");
const {edit_student_get, edit_student_post} = require("../controllers/student_controllers/edit_student");
const {delete_student_get} = require("../controllers/student_controllers/delete_student");
const {read_data} = require("../controllers/show-data");
const {signup_user_post, signup_user_get} = require("../controllers/signup-user");
const {login_user_post} = require("../controllers/login-user");
const {logout_user_get} = require("../controllers/logout-user");


function isLogin(req,res,next)
{
    if(req.session.uid)
    {
        return next()
    }
    res.redirect("/")
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/', login_user_post);
router.get('/logout', logout_user_get);


router.get('/show', isLogin, read_data);
router.get('/signup', signup_user_get);
router.post('/signup', signup_user_post);

// student routes...
router.get('/add-student',add_student_get);
router.post('/add-student', add_student_post);
router.get('/edit-student/:id', edit_student_get);
router.post('/edit-student/:id', edit_student_post);
router.get('/delete-student/:id', delete_student_get);


module.exports = router;
