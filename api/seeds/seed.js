const sequelize = require('../config/connection');

const seedUsers = require('./user-seeds');
const seedPlayers = require('./player-seeds');
const seedGame = require('./game-seeds');
const seedRounds = require('./round-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();
    console.log('Users Seeded');
    await seedPlayers();
    console.log('Players Seeded');
    await seedGame();
    console.log('Games Seeded');
    await seedRounds();
    console.log('Rounds Seeded');
    process.exit(0);
};

seedAll();