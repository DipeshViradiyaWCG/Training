var express = require('express');
var router = express.Router();

const {getAddCategory, postAddCategory, getDisplayCategory, getEditCategory, postEditCategory,getDeleteCategory} = require("../../controllers/admin/category");
const isLogin = require("../../controllers/admin/middleware/isLogin");


router.get("/add", isLogin, getAddCategory);
router.post("/add", isLogin, postAddCategory);
router.get("/display", isLogin, getDisplayCategory);
router.get("/edit/:id", isLogin, getEditCategory);
router.post("/edit/:id", isLogin, postEditCategory);
router.get("/delete/:id", isLogin, getDeleteCategory);


module.exports = router;