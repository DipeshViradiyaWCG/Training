var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const userModel  = require("./models/user");

var mongoose = require('mongoose');


mongoose.connect(
  // "localhost:27017/crud-multiple",
  "mongodb://crud-multiple:crud-multiple@localhost:27017/crud-multiple").then(
    () => {console.log("DB Connected");}
  ).catch(
    (err) => {throw err;}
);

var app = express();

const http = require("http").createServer(app);
let io = require("socket.io")(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var cors = require('cors')
app.use(cors());


const session = require('express-session');
app.use(session({secret : 'keyboard_cat', resave : true, saveUninitialized : true,  cookie : {maxAge : 60 * 100 * 1000, httpOnly : true}}));//100 mins




app.use('/', indexRouter);
app.use('/users', usersRouter);

global.connections = {};

io.on('connection', async (socket) => {
  //   console.log("session demo server");
  //   console.log(socket.request._query['userSession']);
  let currentUserId = socket.request._query['userSession'];
  // console.log(req.session.user);
  let userObj = await userModel.findByIdAndUpdate(  currentUserId    , {socketId : socket.id}); 
  console.log("A user is connected...demo server");
  console.log(socket.id);

  connections[currentUserId] = socket.id;

  console.log("=============");
  console.log(connections);


  
  let onlineUsers = await userModel.find({ socketId: { $ne: null } }).lean();
  // console.log("online users", onlineUsers);
  socket.emit('showOnline', onlineUsers);


  socket.on("chatMessage", async (msgdata, receiverid) => {
    let sender = await userModel.findById(currentUserId).lean();
    // let msgObj = await msgModel.create({
    //   _sender : sender._id,
    //   _receiver : receiverid,
    //   msgdata : msgdata
    // });
    console.log("id--------------------------------------");
    console.log(receiverid);
    socket.broadcast.to(connections[receiverid]).emit("broadcastChat", msgdata, sender._id);
    // socket.broadcast.emit("broadcast chat", msgdata);
  });


  socket.on('disconnect', async () => {
    console.log('user disconnected... demo server');
    console.log(socket.id);
    await userModel.findOneAndUpdate({socketId : socket.id}, {socketId : null});
  });
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(3051, "127.0.0.1");

// module.exports = app;
