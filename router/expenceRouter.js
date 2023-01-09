const express = require('express');

const {addExpence,getExpence} = require('../controller/expenceController')

const router = express.Router()

router.post('/add-expence',addExpence);

router.get('/get',getExpence)

module.exports = router;