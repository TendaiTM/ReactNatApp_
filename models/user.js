const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const { sign } = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
const { request } = require('express');
const { response } = require('express');
const { json } = require('express/lib/response');
const { resolve } = require('path');
const { reject } = require('bcrypt/promises');



const app = express();

class User extends Model {
  static init(sequelize, DataTypes) {
    return this.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'user',
    });
  }

  static associate(models) {
    // Define associations here
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = User;
//