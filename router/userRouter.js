const express = require('express');

const {addUser} = require('../controller/userSignupController');

const router = express.Router();

router.post('/signup',addUser);



module.exports = router