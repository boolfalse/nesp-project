'use strict';

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: ''
    },
    created_at: {
      allowNull: false,
      defaultValue: now,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: false,
      defaultValue: now,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'categories',
    freezeTableName: true,
    // underscored: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  Category.associate = function (models) {
    Category.hasMany(models.Post, { as: 'posts', foreignKey: 'category_id' });
  };

  return Category;
};
