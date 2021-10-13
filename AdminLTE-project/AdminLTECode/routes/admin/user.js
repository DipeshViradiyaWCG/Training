var express = require('express');
var router = express.Router();

const { getAddUser, postAddUser, getDisplayUser, getEditUser, postEditUser, getDeleteUser } = require('../../controllers/admin/user');
const isLogin = require("../../controllers/admin/middleware/isLogin");

router.get("/add", isLogin, getAddUser);
router.post("/add", isLogin, postAddUser);
router.get("/display", isLogin, getDisplayUser);
router.get("/edit/:id", isLogin, getEditUser);
router.post("/edit/:id", isLogin, postEditUser);
router.get("/delete/:id", isLogin, getDeleteUser);

module.exports = router;