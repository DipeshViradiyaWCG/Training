var express = require('express');
var router = express.Router();

const userModel = require("../models/user");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let userData = await userModel.find({},{u_name : 1,u_address : 1, u_monumber : 1}).lean();
  res.json({users : userData});
});

module.exports = router;
