const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const express = require("express");
const path =  require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");
require('dotenv').config();
const bcrypt = require('bcrypt');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;