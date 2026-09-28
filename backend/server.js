require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB, getIsMongoConnected } = require('./config/db');

// Route imports
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const store = require('./config/store');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow local frontend during development
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// Health check & status
app.get('/api/health', (req, res) => {
  const isMongo = getIsMongoConnected();
  res.json({
    status: 'online',
    brand: 'Atelier Noir - Luxury Jackets',
    version: '1.0.0',
    database: isMongo ? 'MongoDB (Connected)' : 'Resilient In-Memory Store (Active)',
    timestamp: new Date().toISOString()
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; padding: 40px; background: #0E0E10; color: #E5E7EB; min-height: 100vh;">
      <h1 style="color: #D4AF37; font-size: 28px; letter-spacing: 2px;">ATELIER NOIR — LUXURY JACKETS API</h1>
      <p style="color: #9CA3AF;">MERN Stack Backend is active and running on port ${PORT}.</p>
      <ul>
        <li><a href="/api/products" style="color: #D4AF37;">/api/products</a> - Jacket archive & filters</li>
        <li><a href="/api/categories" style="color: #D4AF37;">/api/categories</a> - Product categories</li>
        <li><a href="/api/health" style="color: #D4AF37;">/api/health</a> - System health check</li>
      </ul>
    </div>
  `);
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(PORT, () => {
  console.log(`\n\x1b[32m✔ Atelier Noir API Server running on port ${PORT}\x1b[0m`);
  console.log(`  🔗 Local API URL: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`  🔗 Products Endpoint: \x1b[36mhttp://localhost:${PORT}/api/products\x1b[0m\n`);
});
