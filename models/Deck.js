const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Deck extends Model { }

Deck.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    questions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    game_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "game",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "deck",
  }
)

module.exports = Deck;