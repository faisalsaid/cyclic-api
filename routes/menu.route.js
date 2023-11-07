const express = require('express');
const { protected } = require('../middelware/auth.middlware.js');
const { creteMenu, getAllMenu, editMenu, getOneMenu } = require('../controllers/menu.controllers.js');

const router = express.Router();

router.route('/').post(protected, creteMenu).get(protected, getAllMenu);
router.route('/:id').put(protected, editMenu).get(protected, getOneMenu);

module.exports = router;
