var express = require('express');
var router = express.Router();

const {show_products_get, show_product_get} = require("../controllers/product_controllers/show_product");
const {show_products_get_all, show_products_by_category} = require("../controllers/product_controllers/show_product");

/* GET home page. */
router.get('/', show_products_get);

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

// product routes...
router.get('/products', show_products_get_all);
router.get('/products/:category', show_products_by_category);
router.get('/product/:id', show_product_get);



module.exports = router;