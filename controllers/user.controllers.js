const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');

const testUser = asyncHandler(async (req, res) => {
  res.status(200);
  res.json({ messag: 'test user' });
});

// Create User
// @desc    GET user
// @route   GET /api/user/me
// @access  Public
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { getMe, testUser };
