const sequelize = require("../config/connection");
const { User, Dice, Face, Set } = require("../models");

const userData = [
  {
    username: "joe",
    password: "password",
  },
  {
    username: "cats",
    password: "meowmeow",
  },
];

const diceData = [
  {
    name: "animalz",
    isPublic: true,
    UserId: 1,
  },
  {
    name: "nap spotz",
    isPublic: true,
    UserId: 2,
  },
];
const faceData = [
  {
    value: "cat",
    DiceId: 1,
  },
  {
    value: "dog",
    DiceId: 1,
  },
  {
    value: "bird",
    DiceId: 1,
  },
  {
    value: "turtle",
    DiceId: 1,
  },
  {
    value: "laptop",
    DiceId: 2,
  },
  {
    value: "chair",
    DiceId: 2,
  },
  {
    value: "bed",
    DiceId: 2,
  },
  {
    value: "a random box of junk deep in the spare bedroom closet",
    DiceId: 2,
  },
];

const setData = [
  {
    name: "Where the pet sleeps",
    isPublic: true,
    UserId: 1,
  },
];

const seedMe = async () => {
  try {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
    });
    console.table(users.map((usr) => usr.toJSON()));
    console.log("==============================");
    const dices = await Dice.bulkCreate(diceData);
    console.table(dices.map((die) => die.toJSON()));
    console.log("==============================");
    const faces = await Face.bulkCreate(faceData);
    console.table(faces.map((face) => face.toJSON()));
    console.log("==============================");
    const sets = await Set.bulkCreate(setData);
    console.table(sets.map((set) => set.toJSON()));
    await sets[0].addDices([1, 2]);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedMe();
