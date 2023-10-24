const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

// Handle Signup
// @desc    POST auth
// @route   POST /api/auth
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if body field is empty
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all field');
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  console.log(userExists);

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = { signup };
