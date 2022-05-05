'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: false,
        unique: true,
        // defaultValue: ''
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // if 0 then the usage count is unknown, otherwise that's a number of the times it has been used
      },
      created_at: {
        allowNull: false,
        // defaultValue: now,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        // defaultValue: now,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tags');
  }
};
