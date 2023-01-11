const express = require('express');

const {addExpence,getExpence,deleteExpence} = require('../controller/expenceController');

const {authenticate} = require('../middleware/auth')

const router = express.Router()

router.post('/add-expence',authenticate,addExpence);

router.get('/get-expence',authenticate,getExpence);

router.delete('/delete-expence/:id',authenticate,deleteExpence);
module.exports = router;