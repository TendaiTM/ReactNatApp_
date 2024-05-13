const express = require("express");
const path =  require('path');
const mysql = require('mysql');
const dotenv = require("dotenv");
const passport = require('./passport');
const usersRouter = require('./routes/users');
const apiRouter = express.Router();
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const user = require('./models/user');
const session = require('express-session');
const uuid = require('uuid');
const secretKey = uuid.v4();

const app = express();

app.use(session({
  secret: 'your secret key here',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
dotenv.config({ path:'./.env'});

// This is an example of a middleware function
const myMiddleware = (req, res, next) => {
    console.log('This is a middleware function');
    next();
  };

  app.use(myMiddleware);

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
//Pare JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine','hbs');

db.connect((error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL Connected...")
    }
});

//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

// Use Passport.js as middleware
app.use(passport.initialize());
app.use(passport.session());

// Use the User model
app.use('/users', require('./routes/users'));

// Use the middleware function with the use method for a specific route
app.use('/api', myMiddleware);

// Use the middleware function with the use method
apiRouter.use(myMiddleware);

// Define a route for the API
apiRouter.get('/', (req, res) => {
    res.send('API route');
  });

  app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

// Use the router object with the use method
app.use('/api', apiRouter);

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

app.listen(5000,()=>{
    console.log("Server started on port 5000")
});