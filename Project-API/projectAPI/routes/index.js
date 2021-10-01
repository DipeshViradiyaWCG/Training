var express = require('express');
var router = express.Router();

const {show_products_get} = require("../controllers/product_controllers/show_product");

/* GET home page. */
router.get('/', show_products_get);

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

// product routes...

module.exports = router;