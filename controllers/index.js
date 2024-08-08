const express = require("express");
const router = express.Router();

const htmlRoutes = require("./htmlRoutes.js");
router.use("/", htmlRoutes);

const userRoutes = require("./userRoutes.js");
router.use("/api/users", userRoutes);

const diceRoutes = require("./diceRoutes.js");
router.use("/api/dices", diceRoutes);

router.get("/sess", (req, res) => {
  res.json(req.session);
});

module.exports = router;
