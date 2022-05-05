'use strict';

const appConfigs = require('./../config/app');



module.exports = {
  up: async (queryInterface, Sequelize) => {
      const now = new Date();
      const categories = [];
      for (let i = 0; i < appConfigs.seed.category.count; i++) {
          categories.push({
              name: `Category ${i + 1}`,
              created_at: now,
              updated_at: now,
          });
      }
      await queryInterface.bulkInsert('categories', categories, {}, );
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('categories', null, {}),
};
