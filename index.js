require('dotenv').convig();
const express = require('express')
const app = express()
const cors = require('cors');

app.all('/', (req, res) => {
    console.log("Hallo World")
    res.send('Just Simple')
})
app.listen(process.env.PORT || 3000)

