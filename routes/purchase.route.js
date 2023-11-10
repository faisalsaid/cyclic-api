const express = require('express');
const { protected } = require('../middelware/auth.middlware.js');
const { testingOrder, createPurchase, getAllPurchase } = require('../controllers/purchase.controllers.js');

const router = express.Router();

router.route('/').post(protected, createPurchase).get(protected, getAllPurchase);
// router.route('/').post(protected, creteMenu).get(protected, getAllMenu);
// router.route('/:id').put(protected, editMenu).get(protected, getOneMenu).delete(protected, deleteMenu);

module.exports = router;
