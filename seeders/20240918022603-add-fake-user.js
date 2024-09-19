'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', 
      Array.from({length: 3}).map((_, i) => ({
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 60 }),
        username: i + 1,
        password: bcrypt.hashSync('123', 10),
        created_at: new Date(),
        updated_at: new Date()
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
