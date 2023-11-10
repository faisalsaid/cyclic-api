const asyncHandler = require('express-async-handler');
const Purchase = require('../models/purchase.model.js');
const Menu = require('../models/menu.model.js');

const testingOrder = (req, res) => {
  res.status(200).send('testing order succes');
};

// Create Order
// @desc    POST order
// @route   POST /api/order
// @access  Private
// 654a37d420e2c54539133609
// 654af06a7d2381d667af3891
const createPurchase = asyncHandler(async (req, res) => {
  const payload = req.body;
  const pruchase = await Purchase.create(payload);

  if (!pruchase) {
    res.status(400);
    throw new Error.apply('Cant create order');
  }
  res.status(200).json(pruchase);
});

// get Purchase
// @desc    GET purhcase
// @route   GET /api/purhcase
// @access  Private
const getAllPurchase = asyncHandler(async (req, res) => {
  const allPurhase = await Purchase.find().populate('listOrder.item').sort({ _id: -1 });
  if (!allPurhase) {
    res.status(400);
    throw new Error.apply('Cant find any order');
  }

  res.status(200).json(allPurhase);
});

module.exports = { testingOrder, createPurchase, getAllPurchase };
