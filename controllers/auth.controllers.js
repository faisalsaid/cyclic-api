const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Handle Signup
// @desc    POST auth
// @route   POST /api/auth/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;

  // Check if body field is empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all field');
  }

  // check if user exists
  const userExists = await User.findOne({ email });

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
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({ ...rest, token: generateToken(rest._id) });
    // res.cookie('access_token', generateToken(user._id), { httpOnly: true }).status(201).json({
    //   _id: user._id,
    // });
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

  // Check user exist
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('Email not registered');
  }

  if (user && (await bcrypt.compareSync(password, user.password))) {
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({ ...rest, token: generateToken(rest._id) });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// Handle OAuth
// @desc    POST auth
// @route   POST /api/auth/google
// @access  Public
const google = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Check user exist
  const user = await User.findOne({ email });
  if (user) {
    console.log(user);
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({ ...rest, token: generateToken(rest._id) });
  } else {
    const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(generatePassword, salt);

    // Create User
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      avatar: req.body.photo,
    });

    // send user data to client
    if (user) {
      const { password: pass, ...rest } = user._doc;
      res.status(201).json({
        ...rest,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = { signup, signin, google };
