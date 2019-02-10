var express = require("express");
var router = express.Router();

router.get("/stripe-webhook", function(req, res) {
  console.log(req.body);
  res.send();
});
router.post("/stripe-webhook", function(req, res) {
  console.log(req.body);
  res.send();
});

router.get("/trigger-socket-event", function(req, res) {
  require("../socketApi").sendNotification();
  res.json({
    result: "Message sent"
  });
});

module.exports = router;
