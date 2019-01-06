var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on("connection", function(socket) {
  console.log("A user connected");
  socket.on("emit_method", function(data) {
    console.log("An emit_method event", data);
  });
});

setInterval(() => {
  io.sockets.emit("time", { msg: "Hello World!" });
  io.sockets.emit("customEmit", { msg: "a customEmit" });
}, 2500);

socketApi.sendNotification = function() {
  console.log("HAHA");
  io.sockets.emit("time", { msg: "Some else!" });
};

module.exports = socketApi;
