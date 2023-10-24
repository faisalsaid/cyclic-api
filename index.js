require('dotenv').config()
const express = require('express')
const app = express()
const data = process.env.DATA
const port = process.env.PORT || 3000

app.all('/api', (req, res) => {
    console.log("Just got a request!")
    res.send('api is live')
})
app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
})
