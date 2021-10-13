var express = require('express');
var router = express.Router();

const { getAddCity, postAddCity, getDisplayCity, getEditCity, postEditCity, getDeleteCity } = require('../../controllers/admin/city');
const isLogin = require("../../controllers/admin/middleware/isLogin");

router.get("/add", isLogin, getAddCity);
router.post("/add", isLogin, postAddCity);
router.get("/display", isLogin, getDisplayCity);
router.get("/edit/:id", isLogin, getEditCity);
router.post("/edit/:id", isLogin, postEditCity);
router.get("/delete/:id", isLogin, getDeleteCity);


module.exports = router;