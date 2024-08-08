const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Face extends Model {}

Face.init(
  {
    // add properites here, ex:
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Face;
