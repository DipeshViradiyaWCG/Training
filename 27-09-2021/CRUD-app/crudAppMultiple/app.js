var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var fileUpload = require('express-fileupload');

//mongoose
const mongoose = require('mongoose');

//DB comnnection
mongoose.connect(
  // "localhost:27017/crud-multiple",
  "mongodb://crud-multiple:crud-multiple@localhost:27017/crud-multiple").then(
    () => {console.log("Connected");}
  ).catch(
    (err) => {throw err;}
  );
//   (err) => {
//     if(!err)
//       console.log("Connected to DB.");
//     else {
//       throw err;
//     }
//   }
// );

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs({
//     defaultLayout : false,
//     extnamey :'.handlebars'
//   }
// ));
app.set('view engine', 'handlebars');

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: false,
    extname: ".handlebars",
    partialsDir: [path.join(__dirname, "views/partials")],
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
//session
app.use(session({secret : 'keyboard_cat', resave : true, saveUninitialized : true,  cookie : {maxAge : 60000*3, httpOnly : true}}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
