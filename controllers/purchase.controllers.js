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
  const { listOrder, ...payload } = req.body;
  const listId = listOrder.map((list) => list.item._id);

  const menu = await Menu.find({ _id: { $in: listId } });
  if (!menu) {
    res.status(400);
    throw new Error.apply('Menu not exist');
  }

  const listMenuIds = menu.map((menu) => menu._id);
  const pruchase = await Purchase.create({
    ...payload,
    listOrder: listMenuIds,
  });

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
  const allPurhase = await Purchase.find().populate('listOrder');
  if (!allPurhase) {
    res.status(400);
    throw new Error.apply('Cant find any order');
  }

  res.status(200).json(allPurhase);
});

module.exports = { testingOrder, createPurchase, getAllPurchase };
