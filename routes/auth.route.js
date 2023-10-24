const express = require('express');
const { signup } = require('../controllers/auth.controllers.js');

const router = express.Router();

router.route('/').post(signup);

module.exports = router;
