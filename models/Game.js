const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Game extends Model { }

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    round: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    maxrounds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    timer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 15,
    },
    game_owner: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "game",
  }
);

module.exports = Game;