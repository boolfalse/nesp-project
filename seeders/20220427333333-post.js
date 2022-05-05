'use strict';

const faker = require('faker');
const {
    User,
    Category,
} = require('./../models');
const appConfigs = require('./../config/app');
const helper = require('./../utilities/helper');
const fs = require('fs');
const path = require('path');



module.exports = {
  up: async (queryInterface, Sequelize) => {
      const users = await User.findAll({
          attributes: ['id'],
      });
      const userIds = [];
      users.map(user => {
          userIds.push(user.dataValues.id);
      });
      const usersCount = userIds.length;

      const categories = await Category.findAll({
          attributes: ['id'],
      });
      const posts = [];
      let postsCount = 0;
      
      for (let k in categories) {
          if (categories.hasOwnProperty(k)) {
              postsCount = Math.floor(Math.random() * appConfigs.seed.category.posts_count_interval.max)
                  + appConfigs.seed.category.posts_count_interval.min;

              for (let i = 0; i < postsCount; i++)
              {
                  let postImages = [];
                  let postImagesCount = Math.floor(Math.random() * appConfigs.seed.post.images_max_count);
                  for (let i = 0; i < postImagesCount; i++)
                  {
                      let imageExtension = '.jpg';
                      let imageName = helper.random_string(appConfigs.image_name_length) + imageExtension;
                      let randomNumber = Math.floor(Math.random() * appConfigs.seed.post.random_images_count) + 1;
                      let imagePath = path.join(__dirname, `./../public/seed-images/products/product-${randomNumber}${imageExtension}`);
                      await fs.copyFileSync(imagePath, path.join(__dirname, `./../uploads/${imageName}`));

                      postImages.push(imageName);
                  }

                  posts.push({
                      user_id: userIds[usersCount * Math.random() | 0],
                      category_id: categories[k].dataValues.id,
                      title: faker.commerce.productName(),
                      price: faker.datatype.number({
                          min: appConfigs.post.product_price_min,
                          max: appConfigs.post.product_price_max
                      }),
                      description: faker.commerce.productDescription(),
                      images: JSON.stringify(postImages),
                      region: faker.address.country(),
                      city: faker.address.city(),

                      created_at: new Date(),
                      updated_at: new Date(),
                  });
              }
          }
      }

      await queryInterface.bulkInsert('posts', posts, {}, );
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('posts', null, {}),
};
