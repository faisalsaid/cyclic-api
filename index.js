require('dotenv').config();
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const { errorHandler } = require('./middelware/error.middleware.js');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// testing api conection
app.all('/api', (req, res) => {
  console.log('Just got a request!');
  res.send('api is live');
});

app.use('/api/user', require('./routes/user.route.js'));
app.use('/api/auth', require('./routes/auth.route.js'));
app.use('/api/menu', require('./routes/menu.route.js'));
app.use('/api/purchase', require('./routes/purchase.route.js'));
app.use('/api/dashboard', require('./routes/dashboard.route.js'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server run on port ${port}`));
