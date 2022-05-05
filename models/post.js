'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    category_id: {
      type: DataTypes.INTEGER, // (11),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER, // (11),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      // defaultValue: ''
    },
    price: {
      type: DataTypes.INTEGER, // (11)
      allowNull: false,
      defaultValue: 0,
      // get() {
      //   let dollars = this.dataValues.price / 100;
      //   // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_tolocalestring_num_all
      //   return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
      // }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: '[]',
      get() { // show last image
        let imagesJson = this.dataValues.images;
        return imagesJson ? imagesJson[imagesJson.length - 1] : '';
      }
    },
    region: {
      type: DataTypes.STRING(250),
      allowNull: false,
      // defaultValue: ''
    },
    city: {
      type: DataTypes.STRING(250),
      allowNull: false,
      // defaultValue: ''
    },
    created_at: {
      allowNull: false,
      defaultValue: now,
      type: DataTypes.DATE,
      get() {
        return moment(this.dataValues.created_at).format('D MMM YYYY'); // 'D MMM YYYY, LT'
      }
    },
    updated_at: {
      allowNull: false,
      defaultValue: now,
      type: DataTypes.DATE,
      get() {
        return moment(this.dataValues.created_at).format('D MMM YYYY'); // 'D MMM YYYY, LT'
      }
    }
  }, {
    tableName: 'posts',
    freezeTableName: true,
    // underscored: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  Post.associate = (models) => {
    Post.belongsTo(models.Category, { as: 'category', foreignKey: 'category_id' });
    Post.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    Post.belongsToMany(models.Tag, {
      through: 'PostTag',
      as: 'has_tags',
      foreignKey: 'post_id',
      otherKey: 'tag_id'
    });
  };

  return Post;
};
