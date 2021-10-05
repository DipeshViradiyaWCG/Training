const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/user')


const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', userRoutes);

var mongoose = require('mongoose');


mongoose.connect(
  // "localhost:27017/crud-multiple",
  "mongodb://crud-multiple:crud-multiple@localhost:27017/crud-multiple").then(
    () => {console.log("Connected");}
  ).catch(
    (err) => {throw err;}
);


app.get('/', (req, res) => {
  res.json({"message": "Hello World"});
});


app.listen(port, () => {
  console.log(`Server is on ${port}`);
});