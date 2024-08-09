const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Set extends Model {}

Set.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Set;
