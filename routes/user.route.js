const express = require('express')

const router = express.Router()

router.get('/test', (res, req) => {
    res.json({
        message : "Hello World"
    })
} )

module.exports = router