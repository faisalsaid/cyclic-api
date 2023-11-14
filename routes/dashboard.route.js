const express = require('express');
const { protected } = require('../middelware/auth.middlware.js');
const { getAllPurchase } = require('../controllers/dashboard.controllers.js');

const router = express.Router();

router.route('/').get(getAllPurchase);

module.exports = router;
