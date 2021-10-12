const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var path = require("path");

const PORT = process.env.PORT || 3093;

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

io.on("connection", function (socket) {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users", (req, res) => {
  res.render("index");
});
