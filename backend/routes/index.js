var express = require("express");
var router = express.Router();

router.get("/trigger-socket-event", function(req, res) {
  require("../socketApi").sendNotification();
  res.json({
    result: "Message sent"
  });
});

module.exports = router;
