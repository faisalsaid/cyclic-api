const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');

// user TEst

const userTest = (req, res) => {
  res.status(200);
  res.send('tes user route');
};
// Create User
// @desc    POST user
// @route   POST /api/users
// @access  Public
const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if body field is empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all field');
  }
  //   res.status(200);
  res.json({
    name,
    email,
    password,
  });

  //   Check if user sxists
  //   const userExists = await User.findOne({ email });
  //   console.log(userExists);
  //   if (userExists) {
  //     res.status(400);
  //     throw new Error('User already exists');
  //   }
});

module.exports = { addUser, userTest };
