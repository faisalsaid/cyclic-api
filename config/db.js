const mongoose = require('mongoose');

const dbURI = process.env.ENVIRONTMENT === 'production' ? process.env.MONGO_DB : process.env.MONGO_DB_DUMY;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
