const asyncHandler = require('express-async-handler');
const Order = require('../models/order.model.js');
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
const createOrder = asyncHandler(async (req, res) => {
  const { listOrder, ...payload } = req.body;
  const listId = listOrder.map((list) => list.item._id);

  const menu = await Menu.find({ _id: { $in: listId } });
  if (!menu) {
    res.status(400);
    throw new Error.apply('Menu not exist');
  }

  const listMenuIds = menu.map((menu) => menu._id);
  const order = await Order.create({
    ...payload,
    listOrder: listMenuIds,
  });

  if (!order) {
    res.status(400);
    throw new Error.apply('Cant create order');
  }
  res.status(200).json(order);
});

// get Order
// @desc    GET order
// @route   GET /api/order
// @access  Private
const getAllOrder = asyncHandler(async (req, res) => {
  const allOrder = await Order.find().populate('listOrder');
  // const allOrder = await Order.find().populate({
  //   path: 'listOrder',
  //   select: '-customerName', // Exclude specific properties
  // });

  if (!allOrder) {
    res.status(400);
    throw new Error.apply('Cant find any order');
  }

  res.status(200).json(allOrder);
});

module.exports = { testingOrder, createOrder, getAllOrder };
