const express = require('express');
const { protected } = require('../middelware/auth.middlware.js');
const { testingOrder, createOrder } = require('../controllers/order.controllers.js');

const router = express.Router();

router.route('/').get(testingOrder).post(createOrder);
// router.route('/').post(protected, creteMenu).get(protected, getAllMenu);
// router.route('/:id').put(protected, editMenu).get(protected, getOneMenu).delete(protected, deleteMenu);

module.exports = router;
