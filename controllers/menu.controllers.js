const asyncHandler = require('express-async-handler');
const Menu = require('../models/menu.model.js');

// Create Menu
// @desc    POST menu
// @route   POST /api/menu
// @access  Private
const creteMenu = asyncHandler(async (req, res) => {
  const { title, description, price, image, category } = req.body;
  if (!title || !description || !price || !image || !category) {
    res.status(400);
    throw new Error.apply('Please add all field');
  }
  const menu = await Menu.create({
    title,
    description,
    image,
    category,
    price,
  });
  if (!menu) {
    throw new Error.apply('Cant add new menu');
  }
  res.status(200).json(menu);
});

// Get All menu
// @desc    POST menu
// @route   GET /api/menu
// @access  Private
const getAllMenu = asyncHandler(async (req, res) => {
  const allMenu = await Menu.find();
  if (!allMenu) {
    res.status(400);
    throw new Error('Menu not Found');
  }
  res.status(200).json(allMenu);
});

// Get one menu by id
// @desc    get menu
// @route   PUT /api/menu/:id
// @access  Private
const getOneMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  if (!menu) {
    res.status(400);
    throw new Error('Goal not Found');
  }
  res.status(200);
  res.json(menu);
});

// Edit menu by id
// @desc    POST menu
// @route   PUT /api/menu/:id
// @access  Private
const editMenu = asyncHandler(async (req, res) => {
  const { title, description, price, image, category } = req.body;
  if (!title || !description || !price || !image || !category) {
    res.status(400);
    throw new Error.apply('Please add all field');
  }

  const menu = await Menu.findById(req.params.id);
  if (!menu) {
    res.status(400);
    throw new Error('Menu not Found');
  }

  const updateMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updateMenu);
});

// Delete by id
// @desc    DELTE menu
// @route   PUT /api/menu/:id
// @access  Private
const deleteMenu = asyncHandler(async (req, res) => {
  const delMenu = await Menu.findByIdAndRemove(req.params.id);
  if (!delMenu) {
    res.status(400);
    throw new Error('Menu not Found');
  }
  res.status(200).json(req.params.id);
});

module.exports = { creteMenu, getAllMenu, editMenu, getOneMenu, deleteMenu };
