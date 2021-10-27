var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const hbs = require("express-handlebars");

const session = require('express-session');
var fileUpload = require('express-fileupload');

// routers
const adminCategoryRouter = require("./routes/admin/category");
const adminSubcategoryRouter = require("./routes/admin/subcategory");
const productRouter = require("./routes/admin/product");
const stateRouter = require("./routes/admin/state");
const cityRouter = require("./routes/admin/city");
const areaRouter = require("./routes/admin/area");
const userRouter = require("./routes/admin/user");

// DB Code
var mongoose = require('mongoose');
mongoose.connect(
  // "localhost:27017/crud-multiple",
  "mongodb://crud-multiple:crud-multiple@localhost:27017/crud-multiple").then(
    () => {console.log("Connected");}
  ).catch(
    (err) => {throw err;}
);

//routes
var adminRouter = require("./routes/admin/admin");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    layoutsDir : __dirname + "/views/layouts/",
    defaultLayout: 'main',

    partialsDir: __dirname + "/views/partials/",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// session
app.use(session({secret : 'keyboard_cat', resave : true, saveUninitialized : true,  cookie : {maxAge : 600000, httpOnly : true}}));

// file Upload
app.use(fileUpload());

// routes
app.use("/admin", adminRouter);
app.use("/admin/category", adminCategoryRouter);  
app.use("/admin/subcategory", adminSubcategoryRouter);
app.use("/admin/product", productRouter);
app.use("/admin/state", stateRouter);
app.use("/admin/city", cityRouter);
app.use("/admin/area", areaRouter);
app.use("/admin/user", userRouter);


app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
