const express = require("express");
const router = express.Router();
const { User, Set, Dice, Face } = require("../models");

router.get("/", (req, res) => {
  Set.findAll({
    include: [User, Dice],
  })
    .then((sets) => {
      const hbsSets = sets.map((set) => set.toJSON());
      res.render("home", {
        loggedIn: req.session.loggedIn,
        userId: req.session.user?.id,
        sets: hbsSets,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no a nat 1", err });
    });
});

router.get("/profile/:id", (req, res) => {
  //TODO: 404 if no profile found
  User.findByPk(req.params.id, {
    include: [
      {
        model: Set,
        include: [Dice],
      },
    ],
  })
    .then((user) => {
      const hbsUser = user.toJSON();
      res.render("profile", {
        loggedIn: req.session.loggedIn,
        userId: req.session.user?.id,
        isMyProfile: req.session.user?.id === hbsUser.id,
        user: hbsUser,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no a nat 1", err });
    });
});

router.get("/set/:id", (req, res) => {
  Set.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Dice,
        include: [Face],
      },
    ],
  })
    .then((set) => {
      const hbsSet = set.toJSON();
      res.render("oneSet", {
        loggedIn: req.session.loggedIn,
        userId: req.session.user?.id,
        set: hbsSet,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no a nat 1", err });
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect(`/profile/${req.session.user.id}`);
  }
  res.render("auth", {
    loggedIn: false,
    userId: req.session.user?.id,
  });
});

router.get("/newset", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  Dice.findAll({
    where: {
      isPublic: true,
    },
  })
    .then((diceData) => {
      const hbsDice = diceData.map((d) => d.toJSON());
      res.render("newSet", {
        loggedIn: true,
        userId: req.session.user?.id,
        dice: hbsDice,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no a nat 1", err });
    });
});

module.exports = router;
