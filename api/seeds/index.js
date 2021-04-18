const sequelize = require("../config/connection");
const seedGame = require("./gameData");
const seedUser = require("./userData");
const seedRound = require("./roundData");
const seedPlayer = require("./playerData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  
  await seedGame();
  
  await seedRound();

  await seedPlayer();

  process.exit(0);
};

seedAll();