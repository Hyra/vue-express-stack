var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
  // res.send('respond with a resource');
  res.json({
    users: [
      {
        id: 1,
        name: "Stef"
      },
      {
        id: 2,
        name: "Melvin"
      }
    ]
  });
});

module.exports = router;
