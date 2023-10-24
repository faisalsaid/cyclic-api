require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const data = process.env.DATA
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_DB)

const app = express()

app.all('/api', (req, res) => {
    console.log("Just got a request!")
    res.send('api is live')
})
app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
})
