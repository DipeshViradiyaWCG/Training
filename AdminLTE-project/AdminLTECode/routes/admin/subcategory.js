var express = require('express');
var router = express.Router();

const { getAddSubCategory, postAddSubCategory, getDisplaySubCategory, getDeleteSubCategory, getEditSubCategory, postEditSubCategory } = require('../../controllers/admin/subcategory');
const isLogin = require("../../controllers/admin/middleware/isLogin");

router.get("/add", isLogin, getAddSubCategory);
router.post("/add", isLogin, postAddSubCategory);
router.get("/display", isLogin, getDisplaySubCategory);
router.get("/edit/:id", isLogin, getEditSubCategory);
router.post("/edit/:id", isLogin, postEditSubCategory);
router.get("/delete/:id", isLogin, getDeleteSubCategory);

module.exports = router;