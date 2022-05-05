'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('post_tags', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                references: {
                    model: 'posts',
                    key: 'id'
                }
            },
            tag_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                references: {
                    model: 'tags',
                    key: 'id'
                }
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('post_tags');
    }
};
