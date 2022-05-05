'use strict';

const bcrypt = require('bcrypt');

const {
    User,
} = require('./../models');



module.exports = {
  up: async (queryInterface, Sequelize) => {
      const now = new Date();

      const user = {
          email: process.env.DEV_USER_EMAIL ? process.env.DEV_USER_EMAIL : 'user@gmail.com',
          password: process.env.DEV_USER_PASS ? process.env.DEV_USER_PASS : 'secret',
      };
      await User.create({
          name: "John Doe",
          email: user.email,
          password: await bcrypt.hash(user.password, 10),
          created_at: now,
          updated_at: now,
      });
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
