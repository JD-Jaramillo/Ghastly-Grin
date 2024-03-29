const sequelize = require('../config/connection');

const seedUsers = require("./userData");
const seedPlayers = require('./playerData');
const seedGames = require('./gameData');
const seedRounds = require('./roundData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();
    console.log('Users Seeded');
    await seedPlayers();
    console.log('Players Seeded');
    await seedGames();
    console.log('Games Seeded');
    await seedRounds();
    console.log('Rounds Seeded');
    process.exit(0);
};

seedAll();