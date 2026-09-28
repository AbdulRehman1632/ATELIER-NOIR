const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getDashboardStats
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', createOrder);
router.get('/', protect, adminOnly, getOrders);
router.get('/dashboard-stats', protect, adminOnly, getDashboardStats);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;
