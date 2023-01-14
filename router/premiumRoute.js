const express = require('express');

const {showLeaderboard} = require('../controller/premiumController')

const {authenticate} = require('../middleware/auth')

const router = express.Router();

router.get('/show-leaderboard',authenticate,showLeaderboard);

module.exports = router;