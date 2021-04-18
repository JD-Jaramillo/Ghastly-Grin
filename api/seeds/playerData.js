const { Player } = require("../models");

const playerData = [
    {
        score: 4,
        cards: '',
        game_id: 3,
        user_id: 1
    },
    {
        score: 1,
        cards: '',
        game_id: 3,
        user_id: 2
    },
    {
        score: 3,
        cards: '',
        game_id: 2,
        user_id: 3
    }
];

const seedPlayers = () => Player.bulkCreate(playerData);
module.exports = seedPlayers;