const asyncHandler = require('express-async-handler');
const Order = require('../models/order.model.js');

const testingOrder = (req, res) => {
  res.status(200).send('testing order succes');
};

// Create Order
// @desc    POST order
// @route   POST /api/order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const order = await Order.create(req.body);
  res.status(200).json(order);
});

module.exports = { testingOrder, createOrder };
