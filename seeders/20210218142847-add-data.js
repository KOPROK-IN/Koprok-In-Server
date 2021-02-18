'use strict';
const { hashPass } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Mukti',
        email: 'mukti@mail.com',
        password: hashPass('123123'),
        money: 1000000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Milano',
        email: 'milano@mail.com',
        password: hashPass('123123'),
        money: 1000000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rizki',
        email: 'rizki@mail.com',
        password: hashPass('123123'),
        money: 1000000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ami',
        email: 'ami@mail.com',
        password: hashPass('123123'),
        money: 7000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
