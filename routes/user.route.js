const express = require('express');
const { testUser } = require('../controllers/user.controllers.js');

const router = express.Router();

// router.get('/test', (res, req) => {
//     res.json({
//         message : "Hello World"
//     })
// } )

router.route('/').get(testUser);

module.exports = router;
