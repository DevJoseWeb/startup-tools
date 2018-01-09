"use strict";

const bcrypt = require('bcryptjs');
const auth = require('../../config/auth');

const hashPassword = async (user) => {
  if (user.changed('password'))
    user.password = await bcrypt.hash(user.password, auth.saltRounds);
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
    },
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
  });

  User.associate = models => {
    User.hasMany(models.Canva);
  };

  return User;
};
