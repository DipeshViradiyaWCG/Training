var express = require('express');
var router = express.Router();
const {add_product_get,add_product_post} = require("../controllers/product_controllers/add_product");
const {show_products_get, show_products_by_category} = require("../controllers/product_controllers/show_product");
const {edit_product_get, edit_product_post} = require("../controllers/product_controllers/edit_product");
const {delete_product_get} = require("../controllers/product_controllers/delete_product");
const {add_category_get, add_category_post} = require("../controllers/product_controllers/category");
const {admin_get, admin_post, add_admin_get, add_admin_post, show_users_get, deactivate_user_get, activate_user_get, delete_user_get} = require("../controllers/admin");
const {isAdmin} = require("../controllers/middlewares/isAdmin");



/* GET home page. */
router.get('/', admin_get);
router.post('/', admin_post);
router.get('/add-admin', add_admin_get);
router.post('/add-admin', add_admin_post);

router.get('/dashboard', isAdmin, function(req, res, next) {
  res.render('dashboard');
});

router.get('/logout', isAdmin, function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

// router.get('/add-product', function(req, res, next) {
//   res.render('product-views/add-product');
// });

// product routes...
router.get('/add-product', isAdmin, add_product_get);
router.post('/add-product', isAdmin, add_product_post);
router.get('/show-products', isAdmin, show_products_get);
router.get('/show-products/:category', isAdmin, show_products_by_category);
router.get('/edit-product/:id', isAdmin, edit_product_get);
router.post('/edit-product/:id', isAdmin, edit_product_post);
router.get('/delete-product/:id', isAdmin, delete_product_get);
router.get('/add-category', isAdmin, add_category_get);
router.post('/add-category', isAdmin, add_category_post);
router.get('/show-users', isAdmin, show_users_get);
router.get('/deactivate-user/:id', isAdmin, deactivate_user_get);
router.get('/delete-user/:id', isAdmin, delete_user_get);
router.get('/activate-user/:id', isAdmin, activate_user_get);


module.exports = router;
