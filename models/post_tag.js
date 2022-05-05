'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const now = new Date();
    const PostTag = sequelize.define('PostTag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        post_id: {
            type: DataTypes.INTEGER, // (11),
            allowNull: true
        },
        tag_id: {
            type: DataTypes.INTEGER, // (11),
            allowNull: false
        },
    }, {
        tableName: 'post_tags',
        freezeTableName: true,
        // underscored: true,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    PostTag.associate = function (models) {
        PostTag.belongsTo(models.Tag, { as: 'tag', foreignKey: 'tag_id' });
        PostTag.belongsTo(models.Post, { as: 'post', foreignKey: 'post_id' });
    };

    return PostTag;
};
