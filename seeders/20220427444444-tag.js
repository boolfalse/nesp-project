'use strict';

const appConfigs = require('./../config/app');



module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = new Date();
        const tags = [];
        for (let i = 0; i < appConfigs.seed.tag.count; i++) {
            tags.push({
                name: `Tag ${i + 1}`,
                created_at: now,
                updated_at: now,
            });
        }
        await queryInterface.bulkInsert('tags', tags, {}, );
    },
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('tags', null, {}),
};
