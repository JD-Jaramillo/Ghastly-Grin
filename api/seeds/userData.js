const { User } = require("../models");

const userdata = [
  
]

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});
module.exports = seedUser;