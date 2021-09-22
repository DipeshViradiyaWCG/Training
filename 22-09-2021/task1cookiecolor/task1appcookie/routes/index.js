var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/counter', function (req, res, next) {
  var counter;
  if(req.cookies.counter){
    counter = parseInt(req.cookies.counter) + 1;
    res.cookie("counter" , counter, {maxAge : 60000})
  } else {
    counter = 1;
    res.cookie("counter", 1 , {maxAge : 60000});
  }
  res.render('counter', {counter : counter});
});

router.get('/counter-session', function (req, res, next) {
  var countersession;
  if(req.session.countersession){
    countersession = parseInt(req.session.countersession) + 1;
    req.session.countersession = countersession;
  } else {
    countersession = 1;
    req.session.countersession = countersession;
  }
  res.render('countersession', {countersession : countersession});
});

router.post('/', function (req, res, next) {
  // console.log(req.body);
  res.cookie("name", req.body.name, { maxAge: 60000 });
  res.cookie("color", req.body.color, { maxAge: 60000 });
  res.redirect("/color");
});

router.get('/color', function (req, res, next) {
  if(req.cookies.color){
    res.render("color", {msg : `Welcome to the page - ${req.cookies.name}`, color : req.cookies.color});
  } else {
    res.render("color", {msg : "No username - Cookie expired....", color : "white"});

  }
});

router.get('/login', function (req, res, next){
  res.render('login');
});

router.post('/login', function (req, res, next){
  // console.log(req.body);
  var udata;
  var uemail = req.body.email;
  var upass = req.body.password;
  fs.readFile('./userdata.json', 'utf-8', (err, data) => {
    udata = data;
    var udataobj = JSON.parse(udata);
    let auth = false;
    for (let index = 0; index < 3; index++) {
      if(udataobj[index].user === uemail && udataobj[index].password === upass){
        auth = true;
        req.session.user = udataobj[index].user;
      }
    }
    if(auth){
      res.redirect('/welcome');
    } else {
      res.send("Login credentials are wrong...")
    }
  });
});

router.get('/welcome', function (req, res, next){
  if(req.session.user){
    res.render('welcome', {user : req.session.user});
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

module.exports = router;
