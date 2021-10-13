var express = require('express');
var router = express.Router();

const { getAddState, postAddState, getDisplayState, getEditState, postEditState, getDeleteState } = require('../../controllers/admin/state');
const isLogin = require("../../controllers/admin/middleware/isLogin");



router.get("/add", isLogin, getAddState);
router.post("/add", isLogin, postAddState);
router.get("/display", isLogin, getDisplayState);
router.get("/edit/:id", isLogin, getEditState);
router.post("/edit/:id", isLogin, postEditState);
router.get("/delete/:id", isLogin, getDeleteState);

module.exports = router;