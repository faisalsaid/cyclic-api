const express = require('express');
const { protected } = require('../middelware/auth.middlware.js');
const { creteMenu, getAllMenu, editMenu, getOneMenu } = require('../controllers/menu.controllers.js');

const router = express.Router();

router.route('/').post(creteMenu).get(protected, getAllMenu);
router.route('/:id').put(editMenu).get(getOneMenu);

module.exports = router;
