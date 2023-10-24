require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const userRouter = require('./routes/user.route')


const data = process.env.DATA
const port = process.env.PORT || 3000

const db = process.env.ENVIRONTMENT === 'production' ? process.env.MONGO_DB : process.env.MONGO_DB_DUMY

mongoose.connect(db)

const app = express()

app.all('/api', (req, res) => {
    console.log("Just got a request!")
    res.send('api is live')
})
app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
})
