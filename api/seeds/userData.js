const { User } = require("../models");

const userData = [
  {
    username: 'Mike Edwards',
    email: 'mikee@gmail.com',
    password: 'mike1234'
  },
  {
    name: 'Stephen Chase',
    email: 'steveo@gmail.com',
    password: 'steveo1234'
  },
  {
    name: 'Austin Powers',
    email: 'austinpow@gmail.com',
    password: 'austinishere'
  },
  {
    name: 'Winston Powell',
    email: 'winston@gmail.com',
    password: 'winston1234'
  }
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});
module.exports = seedUsers;