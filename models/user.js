'use strict';

module.exports = (sequelize, DataTypes) => {
  const now = new Date();
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      // validate: {
      //   notEmpty: true
      // },
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // defaultValue: ''
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      // defaultValue: ''
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
    tableName: 'users',
    freezeTableName: true,
    // underscored: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  return User;
};
