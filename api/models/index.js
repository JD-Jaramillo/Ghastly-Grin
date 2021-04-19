const User = require("./User");
const Game = require("./Game");
const Player = require("./Player");
const Round = require("./Round");

User.hasOne(Game, {
  foreignKey: "user_id",
});
Game.hasMany(Player, {
  foreignKey: "game_id"
});
User.hasOne(Player, {
  foreignKey: "user_id"
});
Game.hasMany(Round, {
  foreignKey: "game_id"
});
Round.belongsTo(Game, {
  foreignKey: "game_id"
});
Game.belongsTo(User, {
  foreignKey: "user_id"
});
Player.belongsTo(Game, {
  as: "game",
  foreignKey: "game_id"
});
Player.belongsTo(User, {
  as: "user",
  foreignKey: "user_id"
});

module.exports = {User, Game, Player, Round};