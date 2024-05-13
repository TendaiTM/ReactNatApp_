const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require("express");
const session = require('express-session');
const uuid = require('uuid');
const secretKey = uuid.v4();

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

exports.register = async (req, res) => {
    console.log(req.body);

    const {fname,lname,country_id,phoneNo, email, password, passwordConfirm} = req.body;

    try {
        const results = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = results[0];

        if (user && user.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        } else if (password !== passwordConfirm) {
            return res.render('register',{
                message: 'Passwords do not match'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        await db.query('INSERT INTO users SET ?', {fname:fname, lname:lname, country_id:country_id, phoneNo:phoneNo, email:email, password:hashedPassword});

        return res.render('register', {
            message: 'User registered'
        });
    } catch (error) {
        console.log(error.message);
        return res.render('register', {
            message: 'An error occurred while registering the user'
        });
    }
}

exports.login = async (req, res) => {
    console.log(req.body);

    const {email, password} = req.body;

    try {
        const results = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = results[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', {
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.cookie('jwt', token, {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        });

        return res.redirect('/dashboard');
    } catch (error) {
        console.log(error.message);
        return res.render('login', {
            message: 'An error occurred while logging in'
        });
    }
}

        exports.index = (req, res) => {
            console.log(req.body);
        }


        //