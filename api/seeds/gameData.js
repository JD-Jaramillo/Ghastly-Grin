const { Game } = require("../models");

const gameData = [
    {
        game_owner: 1
    },
    {
        game_owner: 3
    },
    {
        game_owner: 2
    }
];

const seedGames = () => Game.bulkCreate(gameData);
module.exports = seedGames;