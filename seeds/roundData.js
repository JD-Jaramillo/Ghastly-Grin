const { Round } = require("../models");

const roundData = [
    {
        prompt: "",
        game_id: 2,
        users: "",
        answers: ""
    },
    {
        prompt: "",
        game_id: 3,
        users: "",
        answers: ""
    },
    {
        prompt: "",
        game_id: 1,
        users: "",
        answers: ""
    }
];

const seedRounds = () => Round.bulkCreate(roundData);
module.exports = seedRounds;