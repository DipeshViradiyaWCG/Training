var express = require('express');
var router = express.Router();

const { getAddSubCategory, postAddSubCategory, getDisplaySubCategory, getDeleteSubCategory, getEditSubCategory, postEditSubCategory } = require('../../controllers/admin/subcategory');

router.get("/add", getAddSubCategory);
router.post("/add", postAddSubCategory);
router.get("/display", getDisplaySubCategory);
router.get("/edit/:id", getEditSubCategory);
router.post("/edit/:id", postEditSubCategory);
router.get("/delete/:id", getDeleteSubCategory);

module.exports = router;