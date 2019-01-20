var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on("connection", function(socket) {
  console.log("A user connected");
  socket.on("pingEvent", function(data) {
    console.log("Received ping", data);
    socket.emit("pongEvent", { msg: "Pong Local" });
    io.sockets.emit("pongEvent", { msg: "Pong Global" });
    io.sockets.emit("sample/pongEvent", { msg: "Pong Global" });
  });
});

var nsp = io.of("secret");
nsp.on("connection", function() {
  // console.log("Connected to secret channel");
  nsp.emit("hi", "everyone!");
});

setInterval(() => {
  io.sockets.emit("time", { msg: "Periodic Time" });
}, 1000);

socketApi.sendNotification = function() {
  io.sockets.emit("pongEvent", { msg: "Pong from notification" });
};

module.exports = socketApi;
