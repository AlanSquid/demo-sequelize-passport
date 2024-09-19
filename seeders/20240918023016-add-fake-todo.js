'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('todos', 
      Array.from({length: 6 * 3}).map((_, i) => ({
        title: `Todo ${i + 1}`,
        is_done: false,
        user_id: i % 3 + 1,
        created_at: new Date(),
        updated_at: new Date()
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {});
  }
};
