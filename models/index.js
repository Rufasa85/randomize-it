const User = require("./User");
const Dice = require("./Dice");
const Face = require("./Face");
const Set = require("../db/Set");

User.hasMany(Dice);
Dice.belongsTo(User);

Dice.hasMany(Face, {
  onDelete: "CASCADE",
});
Face.belongsTo(Dice);

User.hasMany(Set, {
  onDelete: "CASCADE",
});
Set.belongsTo(User);

Set.belongsToMany(Dice, {
  through: "SetsDices",
});
Dice.belongsToMany(Set, {
  through: "SetsDices",
});

module.exports = {
  User,
  Dice,
  Face,
  Set,
};
