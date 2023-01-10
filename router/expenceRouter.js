const express = require('express');

const {addExpence,getExpence,deleteExpence} = require('../controller/expenceController')

const router = express.Router()

router.post('/add-expence',addExpence);

router.get('/get-expence',getExpence);

router.delete('/delete-expence/:id',deleteExpence);
module.exports = router;