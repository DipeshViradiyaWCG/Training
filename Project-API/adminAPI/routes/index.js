var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get('/add-product', function(req, res, next) {
  res.render('product-views/add-product');
});

module.exports = router;
