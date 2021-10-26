var express = require('express');
var router = express.Router();

let fetch = require("node-fetch");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let apiData = await fetch("http://localhost:3000/users");
  let userData = await apiData.json();
  let apiDataOther = await fetch("https://catfact.ninja/fact");
  let catFacts = await apiDataOther.json();
  res.render("index", { title: "Express", users: userData.users , fact : catFacts.fact});
});


module.exports = router;
