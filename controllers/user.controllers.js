const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');

const testUser = (req, res) => {
  res.send('halo');
};

module.exports = { testUser };
