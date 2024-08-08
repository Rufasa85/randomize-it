const express = require("express");
const router = express.Router();
const { Dice, Face } = require("../models");

// //read all
// router.get("/", (req, res) => {
//   Dice.findAll()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "oh no!", err });
//     });
// });

// //create
router.post("/", (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ msg: "not logged in!" });
  }
  console.log(req.body);
  if (req.body.size !== req.body.faces?.length) {
    return res.status(400).json({ msg: "incorrect number of faces" });
  }
  Dice.create({
    name: req.body.name,
    size: req.body.size,
    UserId: req.session.user.id,
    isPublic: req.body.isPublic,
  })
    .then((data) => {
      const faces = req.body.faces.map((str) => {
        return {
          value: str,
          DiceId: data.id,
        };
      });
      Face.bulkCreate(faces).then((faces) => {
        res.json(data);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//read one
router.get("/:id", (req, res) => {
  Dice.findByPk(req.params.id, {
    include: [Face],
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: "no such Dice" });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//edit one
// router.put("/:id", (req, res) => {
//   Dice.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((data) => {
//       if (!data[0]) {
//         return res.status(404).json({ msg: "no such Dice" });
//       }
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "oh no!", err });
//     });
// });

// //delete one
// router.delete("/:id", (req, res) => {
//   Dice.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((data) => {
//       if (!data) {
//         return res.status(404).json({ msg: "no such Dice" });
//       }
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "oh no!", err });
//     });
// });

module.exports = router;
