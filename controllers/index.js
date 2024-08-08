const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("i am route");
});

module.exports = router;
