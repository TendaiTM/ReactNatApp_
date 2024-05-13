const { Model, DataTypes } = require('sequelize');
const express = require("express");
const path =  require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const session = require('express-session');
const secretKey = uuid.v4();


// Load environment variables
dotenv.config();

// Create a Sequelize instance
const sequelize = new mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const app = express();

app.use(session({
  secret: 'your secret key here',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

class User extends Model {}

User.init({
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

module.exports = User;