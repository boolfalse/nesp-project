'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: ''
      },
      email: {
        type: Sequelize.STRING(250),
        allowNull: false,
        // defaultValue: ''
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
        // defaultValue: ''
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
    return queryInterface.dropTable('users');
  }
};
