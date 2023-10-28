const express = require('express');
const { getMe, testUser } = require('../controllers/user.controllers.js');
const { protected } = require('../middelware/auth.middlware.js');

const router = express.Router();

router.route('/me').get(protected, getMe);
router.route('/test').get(testUser);

module.exports = router;
