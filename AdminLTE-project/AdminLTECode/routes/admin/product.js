var express = require('express');
var router = express.Router();

const { getAddProduct, postAddProduct, getDisplayProduct, getEditProduct, postEditProduct, getDeleteProduct } = require('../../controllers/admin/product');
const isLogin = require("../../controllers/admin/middleware/isLogin");


router.get("/add", isLogin, getAddProduct);
router.post("/add", isLogin, postAddProduct);
router.get("/display", isLogin, getDisplayProduct);
router.get("/edit/:id", isLogin, getEditProduct);
router.post("/edit/:id", isLogin, postEditProduct);
router.get("/delete/:id", isLogin, getDeleteProduct);

module.exports = router;