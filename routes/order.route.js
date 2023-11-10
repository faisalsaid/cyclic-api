const express = require('express');
const { protected } = require('../middelware/auth.middlware.js');
const { testingOrder, createOrder, getAllOrder } = require('../controllers/order.controllers.js');

const router = express.Router();

router.route('/').post(protected, createOrder).get(protected, getAllOrder);
// router.route('/').post(protected, creteMenu).get(protected, getAllMenu);
// router.route('/:id').put(protected, editMenu).get(protected, getOneMenu).delete(protected, deleteMenu);

module.exports = router;
