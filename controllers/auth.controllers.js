const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Handle Signup
// @desc    POST auth
// @route   POST /api/auth/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if body field is empty
  if (!name || !email || !password) {
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
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.cookie('access_token', generateToken(user._id), { httpOnly: true }).status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Handle signin
// @desc    POST auth
// @route   POST /api/auth/signin
// @access  Public
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if body field is empty
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all field');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('Email not registered');
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.cookie('access_token', generateToken(user._id), { httpOnly: true }).status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = { signup, signin };
