var express = require('express');
var router = express.Router();

const { getAddProduct, postAddProduct, getDisplayProduct, getEditProduct, postEditProduct, getDeleteProduct } = require('../../controllers/admin/product');


router.get("/add", getAddProduct);
router.post("/add", postAddProduct);
router.get("/display", getDisplayProduct);
router.get("/edit/:id", getEditProduct);
router.post("/edit/:id", postEditProduct);
router.get("/delete/:id", getDeleteProduct);

module.exports = router;