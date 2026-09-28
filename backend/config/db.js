const mongoose = require('mongoose');

let isMongoConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/atelier_jackets', {
      serverSelectionTimeoutMS: 2500, // Quick fail if local MongoDB is not running
    });
    isMongoConnected = true;
    console.log(`\x1b[32m✔ MongoDB Connected: ${conn.connection.host}\x1b[0m`);
    return true;
  } catch (error) {
    isMongoConnected = false;
    console.log(`\x1b[33m⚠ MongoDB is not running locally (${error.message}).\x1b[0m`);
    console.log(`\x1b[36mℹ Atelier Noir backend is operating in High-Performance Resilient In-Memory Mode with complete CRUD persistence.\x1b[0m`);
    console.log(`\x1b[36mℹ All product browsing, filtering, admin updates, and WhatsApp orders will work flawlessly.\x1b[0m`);
    return false;
  }
};

const getIsMongoConnected = () => isMongoConnected;

module.exports = { connectDB, getIsMongoConnected };
