const express = require('express');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/auth');
const bcrypt = require('bcrypt');

const router = express.Router();

const app = express();

//define the register route
router.post('/register', authController.register);

router.post('/index', authController.login);

router.get('/', (req, res) => {
    res.render('login');
})

//define the login route
router.get('/login', (req, res) => {
    res.render('index');
});

//define the login post route
router.post('/login',authController.login);

module.exports = router;