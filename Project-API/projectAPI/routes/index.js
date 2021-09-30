var express = require('express');
var router = express.Router();

const {add_product} = require("../API/add_product");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/add-product', add_product);

module.exports = router;