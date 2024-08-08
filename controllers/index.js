const express = require("express");
const router = express.Router();

const htmlRoutes = require("./htmlRoutes.js");
router.use("/", htmlRoutes);

module.exports = router;
