require('dotenv').config()
const express = require('express')
const app = express()
const data = process.env.DATA
app.all('/api', (req, res) => {
    console.log("Just got a request!")
    res.send('api is live')
})
app.listen(process.env.PORT || 3000)
