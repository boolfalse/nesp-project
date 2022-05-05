'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: 'users',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING(250),
        allowNull: false,
        // defaultValue: ''
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      images: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: '[]'
        // get: function () {
        //   return JSON.parse(this.getDataValue('images'));
        // },
        // set: function (value) {
        //   this.setDataValue('images', JSON.stringify(value));
        // }
      },
      region: {
        type: Sequelize.STRING(250),
        allowNull: false,
        // defaultValue: ''
      },
      city: {
        type: Sequelize.STRING(250),
        allowNull: false,
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
    return queryInterface.dropTable('posts');
  }
};
