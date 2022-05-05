'use strict';

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
      // defaultValue: ''
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // if 0 then the usage count is unknown, otherwise that's a number of the times it has been used
    },
    created_at: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    }
  }, {
    tableName: 'tags',
    freezeTableName: true,
    // underscored: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  Tag.associate = (models) => {
    Tag.hasMany(models.PostTag, { as: 'post_tags', foreignKey: 'tag_id' });
    // Tag.belongsToMany(models.Post, {
    //   through: 'PostTags',
    //   as: 'has_tags',
    //   foreignKey: 'tag_id',
    //   otherKey: 'post_id'
    // });
  };

  return Tag;
};
