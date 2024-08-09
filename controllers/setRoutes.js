const express = require("express");
const router = express.Router();
const { Set, Dice } = require("../models");

// //read all
// router.get("/", (req, res) => {
//   Set.findAll()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "oh no!", err });
//     });
// });

//create
router.post("/", (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ msg: "login first!" });
  }
  Set.create({
    name: req.body.name,
    isPublic: req.body.isPublic,
    UserId: req.session.user.id,
  })
    .then((data) => {
      data.addDices(req.body.dice).then((result) => {
        res.json(data);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//read one
// router.get("/:id", (req, res) => {
//   Set.findByPk(req.params.id)
//     .then((data) => {
//       if (!data) {
//         return res.status(404).json({ msg: "no such Set" });
//       }
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "oh no!", err });
//     });
// });

//edit one
// router.put("/:id", (req, res) => {
//   Set.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((data) => {
//       if (!data[0]) {
//         return res.status(404).json({ msg: "no such Set" });
//       }
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "oh no!", err });
//     });
// });

delete one;
router.delete("/:id", (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ msg: "not logged in" });
  }
  Set.destroy({
    where: {
      id: req.params.id,
      UserId: req.session.user.id,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: "no such Set, or not your set" });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

module.exports = router;
