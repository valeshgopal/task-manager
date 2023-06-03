const express = require('express');
const router = express.Router();
const { loginUser, signupUser } = require('../controllers/userController');

//user signup
router.post('/signup', signupUser);

//user login
router.post('/login', loginUser);

module.exports = router;
