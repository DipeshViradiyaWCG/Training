var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', msg: 'message of about page => Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione corporis unde dicta asperiores, nisi doloribus vitae cupiditate consequuntur sed nesciunt.' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', details : [{admin : '9876543210'}, {admin : '01259874630'}] });
});

module.exports = router;
