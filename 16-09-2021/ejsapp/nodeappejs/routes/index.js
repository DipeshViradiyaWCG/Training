var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.render('animal', { title: 'animal' });
});



module.exports = router;
