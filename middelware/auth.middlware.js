const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const protected = asyncHandler(async (req, res, next) => {
  try {
    // // Get token from cookie
    // const token = req.cookies.access_token;

    // Get token from header
    token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    throw new Error('Not Authorized');
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protected };
