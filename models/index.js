const User = require("./User");
const Game = require("./Game");
const Player = require("./Player");
const Round = require("./Round");
const Deck = require("./Deck");

User.hasOne(Game, {
  foreignKey: "game_owner",
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
  foreignKey: "game_owner"
});
Player.belongsTo(Game, {
  as: "game",
  foreignKey: "game_id"
});
Player.belongsTo(User, {
  as: "user",
  foreignKey: "user_id"
});
Game.hasOne(Deck, {
  foreignKey: "game_id"
});
Deck.belongsTo(Game, {
  foreignKey: "game_id"
})

module.exports = {User, Game, Player, Round, Deck};