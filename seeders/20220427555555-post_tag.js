'use strict';

const {
    Tag,
    Post,
} = require('./../models');
const faker = require('faker');
const appConfigs = require('./../config/app');



module.exports = {
  up: async (queryInterface, Sequelize) => {
      const tags = await Tag.findAll({
          attributes: ['id'],
      });
      const tagIds = [];
      tags.map(tag => {
          tagIds.push(tag.dataValues.id);
      });

      const posts = await Post.findAll({
          attributes: ['id'],
          // order: Sequelize.literal('random()'), // other way
          order: Sequelize.rand,
          limit: appConfigs.seed.post.tag_usages_count,
      });
      const postIds = [];
      posts.map(post => {
          postIds.push(post.dataValues.id);
      });

      const postTags = [];
      tagIds.map(tagId => {
          postIds.map(postId => {
              postTags.push({
                  tag_id: tagId,
                  post_id: postId,
                  // count: 0,
              });
          });
      });

      await queryInterface.bulkInsert('post_tags', postTags, {}, );
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('post_tags', null, {}),
};
