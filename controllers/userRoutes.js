const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");

//create
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((data) => {
      req.session.loggedIn = true;
      req.session.user = {
        id: data.id,
        username: data.username,
      };
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(401).json({ msg: "invalid login" });
      } else if (!bcrypt.compareSync(req.body.password, data.password)) {
        return res.status(401).json({ msg: "invalid login" });
      }
      req.session.loggedIn = true;
      req.session.user = {
        id: data.id,
        username: data.username,
      };
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//logout
router.delete("/logout", (req, res) => {
  req.session.destroy();
  res.send("logged out!");
});

module.exports = router;
