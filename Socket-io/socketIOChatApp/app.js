const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");

const hbs = require("express-handlebars");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: false,
  })
);

const session = require('express-session');
app.use(session({secret : 'keyboard_cat', resave : true, saveUninitialized : true,  cookie : {maxAge : 6000000, httpOnly : true}}));


const userModel = require("./models/user");
const { nextTick } = require('process');

app.use(express.urlencoded({ extended: false }));

var mongoose = require('mongoose');


mongoose.connect(
  // "localhost:27017/crud-multiple",
  "mongodb://crud-multiple:crud-multiple@localhost:27017/crud-multiple").then(
    () => {console.log("Connected");}
  ).catch(
    (err) => {throw err;}
);


// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/signup', function(req, res) {
  let userdata = {
    username: req.body.username,
    useremail: req.body.useremail,
    userpassword: req.body.userpassword,
    usermsgs: {
      demo : [{msg : "hello"}]
    }
  }

  new userModel(userdata).save((err, data) => {
    if (err)
      nextTick(err);
    req.session.uname = data.username;
    res.redirect("/chat");
  });
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', function(req, res) {
  // let userdata = {
  //   username: req.body.username,
  //   userpassword: req.body.userpassword
  // }
  req.session.uname = req.body.username;
  res.redirect("/chat");

});

app.get("/chat", async function (req, res) {
  res.render('./chat', {uname : req.session.uname});
});

app.post("/chat", async function (req, res) {
  let currentUser = await req.session.uname;
  let userobj = await userModel.findOne({username : currentUser}).lean();
  let toUser = await req.body.toUser;
  
  let usermsgs = await userobj.usermsgs;
  try {
    if(userobj.usermsgs.toUser){
      usermsgs.toUser = await usermsgs.toUser.push({msg : req.body.msg, time : Date.now()});
    }
    else{
      usermsgs.toUser = await [{msg : req.body.msg, time : Date.now()}];
    }
    await userModel.findOneAndUpdate({username : currentUser}, {usermsgs});
  } catch (error) {
    next(error);
  }
  res.render('./chat', {uname : req.session.uname});
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        // console.log("msg" + msg);
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});