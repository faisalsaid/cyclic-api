require('dotenv').config();
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');

const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// testing api conection
app.all('/api', (req, res) => {
  console.log('Just got a request!');
  res.send('api is live');
});

app.use('/api/users', require('./routes/user.route.js'));

app.listen(port, () => console.log(`Server run on port ${port}`));
