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

// const mongoose = require('mongoose');

// const dbURI = process.env.ENVIRONTMENT === 'production' ? process.env.MONGO_DB : process.env.MONGO_DB_DUMY;

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(dbURI, {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//       // bufferTimeoutMS: 20000, // Increased timeout to 20 seconds
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1); // Exit process on connection failure
//   }
// };

// module.exports = connectDB;
