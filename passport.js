const { Model, DataTypes } = require('sequelize');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require("express");
const path =  require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const uuid = require('uuid');
const secretKey = uuid.v4();

// Load environment variables from .env file
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Import the User model
const User = require('./models/user');

// Set up Passport.js with a local strategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Find the user by username and check if the password is correct
    User.findOne({
        where: {
        username: username,
        },
    }).then((user) => {
        if (!user) {
        return done(null, false);
        }
    
        bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return done(err);
        }
    
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false);
        }
        });
    }).catch((err) => {
        return done(err);
    });
  }
));

    // Serialize and deserialize the user object
    passport.serializeUser((user, done) => {
    done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
    // Find the user by ID and call `done` with the user object
    User.findByPk(id)
        .then((user) => {
        done(null, user);
        })
        .catch((err) => {
        done(err);
        });
    });

// Use Passport.js as middleware
module.exports = passport;