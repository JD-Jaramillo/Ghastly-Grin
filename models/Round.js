const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Round extends Model { }

Round.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    prompt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "game",
        key: "id",
      },
    },
    //Might have to make these strings, then just parse them, or use postgre
    users: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: true,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "round",
  }
)

module.exports = Round;