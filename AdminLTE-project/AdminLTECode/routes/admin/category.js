var express = require('express');
var router = express.Router();

const {getAddCategory, postAddCategory, getDisplayCategory, getEditCategory, postEditCategory,getDeleteCategory} = require("../../controllers/admin/category");

router.get("/add", getAddCategory);

router.post("/add", postAddCategory);

router.get("/display", getDisplayCategory);

router.get("/edit/:id", getEditCategory);
router.post("/edit/:id", postEditCategory);

router.get("/delete/:id", getDeleteCategory);


module.exports = router;