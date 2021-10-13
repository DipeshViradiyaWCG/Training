var express = require('express');
var router = express.Router();

const { getAddArea, postAddArea, getDisplayArea, getEditArea, postEditArea, getDeleteArea } = require('../../controllers/admin/area');
const isLogin = require("../../controllers/admin/middleware/isLogin");


router.get("/add", isLogin, getAddArea);
router.post("/add", isLogin, postAddArea);
router.get("/display", isLogin, getDisplayArea);
router.get("/edit/:id", isLogin, getEditArea);
router.post("/edit/:id", isLogin, postEditArea);
router.get("/delete/:id", isLogin, getDeleteArea);

module.exports = router;