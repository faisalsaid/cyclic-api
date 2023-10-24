const express = require('express');
const { addUser, userTest } = require('../controllers/user.controllers.js');

const router = express.Router();

// router.get('/test', (res, req) => {
//     res.json({
//         message : "Hello World"
//     })
// } )

router.route('/').post(addUser);
router.route('/test').get(userTest);

module.exports = router;
