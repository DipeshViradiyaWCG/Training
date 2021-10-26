const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var path = require("path");

const userModel = require("./models/user");

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

app.get('/signup', (req, res) => {

});

app.get('/login', (req, res) => {
  res.render("login");
});

app.get('/validateemail', async (req, res) => {
  req.query.email;
  let userObj = await userModel.find({email : req.query.email}).lean();
  if(userObj.length > 0){
    res.send(false);
  }
  res.send(true);

})

server.listen(3000, () => {
  console.log('listening on *:3000');
});