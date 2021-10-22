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
var current;

var mongoose = require('mongoose');


mongoose.connect(
  // "localhost:27017/crud-multiple",
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

app.get("/logout", async (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
})

app.get("/chat", async (req, res, next) => {
  res.render("chat", {current : req.session.current, session : req.session.user});
})


// io.on('connection', async (socket) => {
//   console.log(socket.id);
//   // console.log(socket.length());
  
//   let userObj = await userModel.findByIdAndUpdate(  sessionUser    , {socketId : socket.id}); 
//   console.log("A user is connected...");

//   console.log("Connected users...");
//   // console.log(io.sockets.sockets);

//   let onlineusers = await userModel.find({ socketId: { $ne: null } }).lean();
//   socket.emit('show online', onlineusers);
//   // onlineusers.push(sessionUser);


//   // let msgmodelobj = await msgModel.find().populate('_sender').populate('_receiver').sort({
//   //   createdAt : 'asc'// 'desc'
//   // }).lean();


//   // console.log(msgmodelobj);
//   // await socket.emit("show chat", msgmodelobj);
//   // let listofonline = await online
//   // await socket.emit("show online", onlineusers);

  

//   socket.on("chat message", async (msgdata) => {
//     let sender = await userModel.findOne({_id : sessionUser}).lean();
//     let msgObj = await msgModel.create({
//       _sender : sender._id,
//       msgdata : msgdata
//     });
//     socket.broadcast.emit("broadcast chat", msgdata);
//   });

//   socket.on("logout", async () => {
//     console.log('user disconnected');
//     console.log(socket.id);
//     await userModel.findOneAndUpdate({socketId : socket.id}, {socketId : null});
//     let onlineusersafterdisconnect = await userModel.find({ socketId: { $ne: null } }).lean();
//     socket.emit('show online', onlineusersafterdisconnect);
//   });

//   socket.on('disconnect', async () => {
//     console.log('user disconnected');
//     console.log(socket.id);
//     await userModel.findOneAndUpdate({socketId : socket.id}, {socketId : null});
//     let onlineusersafterdisconnect = await userModel.find({ socketId: { $ne: null } }).lean();
//     socket.emit('show online', onlineusersafterdisconnect);
//     // if (onlineusers.indexOf(sessionUser) > -1) {
//     //   array.splice(onlineusers.indexOf(sessionUser), 1);
//     // }
//   });
// });

server.listen(3050, () => {
  console.log('listening on *:3050');
});