const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DB

async function connectDB(){
  try {
    await mongoose.connect(DB)
    console.log('database connnected....')
  }catch(err){
    console.err(err.message);
    process.exit(1)
  }
}

module.exports = connectDB;
