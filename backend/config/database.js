// const mongoose = require('mongoose');

// const connectDatabase = ()=>{
//     mongoose.connect(process.env.DB_LOCAL_URI)
//     .then(con=>{
//         console.log(`MongoDB is connected to the host: ${con.connection.host}`)
//     })
// }

// module.exports = connectDatabase;


const mongoose = require('mongoose');

let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`MongoDB connected to host: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    throw err;
  }
};

module.exports = connectDatabase;

