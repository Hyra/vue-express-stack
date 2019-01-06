module.exports = function(io) {
  io.on("connection", function(socket) {
    console.log("A user connsssected", socket);
  });
  // io stuff here... io.on('conection.....
};
