require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const Order = require('../models/Order');
const { products, categories, sampleOrders } = require('./seedData');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/atelier_jackets';
    console.log(`\n\x1b[35m════════════════════════════════════════════════════════════\x1b[0m`);
    console.log(`\x1b[36m   ATELIER NOIR LUXURY JACKETS - DATABASE SEEDER\x1b[0m`);
    console.log(`\x1b[35m════════════════════════════════════════════════════════════\x1b[0m\n`);
    console.log(`Connecting to: ${mongoUri}...`);

    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 4000 });
    console.log(`\x1b[32m✔ MongoDB Connection Established.\x1b[0m`);

    // Clear old records
    console.log(`Purging existing archives...`);
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // Seed Admin User
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const adminUser = await User.create({
      name: 'Atelier Noir Master Admin',
      email: process.env.ADMIN_EMAIL || 'admin@ateliernoir.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log(`\x1b[32m✔ Seeded Admin User:\x1b[0m ${adminUser.email} (Password: ${adminPassword})`);

    // Seed Categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`\x1b[32m✔ Seeded ${createdCategories.length} Luxury Categories.\x1b[0m`);

    // Seed Products
    const createdProducts = await Product.insertMany(products);
    console.log(`\x1b[32m✔ Seeded ${createdProducts.length} Mastercrafted Jackets.\x1b[0m`);

    // Seed Orders
    const createdOrders = await Order.insertMany(sampleOrders);
    console.log(`\x1b[32m✔ Seeded ${createdOrders.length} WhatsApp Client Orders.\x1b[0m`);

    console.log(`\n\x1b[32m✨ Database successfully populated with realistic high-end jacket catalog!\x1b[0m\n`);
    process.exit(0);
  } catch (error) {
    console.error(`\x1b[31m✖ Seeding failed:\x1b[0m ${error.message}`);
    console.log(`\x1b[33mℹ Note: If local MongoDB is not yet running, the backend server will automatically run with the built-in resilient in-memory store!\x1b[0m\n`);
    process.exit(1);
  }
};

seedDatabase();
