const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");

const userModel  = require("./models/user");
const msgModel  = require("./models/message");

app.use(express.urlencoded({ extended: false }));

// let onlineusers = [];



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


var sessionUser;

var mongoose = require('mongoose');


mongoose.connect(
  "mongodb://crud-multiple:crud-multiple@localhost:27017/crud-multiple").then(
    () => {console.log("DB Connected");}
  ).catch(
    (err) => {throw err;}
);


const session = require('express-session');
app.use(session({secret : 'keyboard_cat', resave : true, saveUninitialized : true,  cookie : {maxAge : 60 * 100 * 1000, httpOnly : true}}));//100 mins

var cors = require('cors')
app.use(cors({
  origin: 'http://localhost:3050/chat',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));


//Sign Up
app.get("/signup", async (req, res, next) => {
  res.render("./signup");
});

app.post("/signup", async (req, res, next) => {
  let uObj = await userModel.create({
    username : req.body.username,
    socketId : ""
  });
  req.session.user = uObj._id;
  sessionUser = req.session.user;
  req.session.current = uObj.username;

  res.redirect("/chat");

});

//Login
app.get("/login", async (req, res, next) => {
  res.render("login");
});

app.post("/login", async (req, res, next) => {
  let uObj = await userModel.findOne({username : req.body.username}).lean();
  req.session.user = uObj._id;
  sessionUser = req.session.user;
  req.session.current = uObj.username;
  res.redirect("/chat");
});

//Logout
app.get("/logout", async (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
})

//Open Chat page
app.get("/chat", async (req, res, next) => {
  res.render("chat", {current : req.session.current, session : req.session.user});
})

server.listen(3050, () => {
  console.log('listening on *:3050');
});