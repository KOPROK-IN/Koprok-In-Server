'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true,
        isEmail:true
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    money: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user, opt) => {
        user.password = hashPass(user.password)
        user.name = Number(new Date())
        user.money = 5000000
      }
    }
  });
  return User;
};