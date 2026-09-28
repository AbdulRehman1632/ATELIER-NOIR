const Order = require('../models/Order');
const Product = require('../models/Product');
const Category = require('../models/Category');
const store = require('../config/store');
const { getIsMongoConnected } = require('../config/db');

// @desc    Create new order or log WhatsApp Direct order inquiry
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, customerEmail, shippingAddress, items, totalAmount, orderType, whatsappMessage } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const orderNumber = `ATN-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    if (getIsMongoConnected()) {
      const order = await Order.create({
        orderNumber,
        customerName: customerName || 'VIP Client',
        customerPhone: customerPhone || '',
        customerEmail: customerEmail || '',
        shippingAddress: shippingAddress || 'To be confirmed via WhatsApp',
        items,
        totalAmount: Number(totalAmount) || 0,
        orderType: orderType || 'WhatsApp Direct',
        whatsappMessage: whatsappMessage || ''
      });

      return res.status(201).json({ success: true, data: order, message: 'Order inquiry registered' });
    }

    const newOrder = store.createOrder({
      customerName: customerName || 'VIP Client',
      customerPhone: customerPhone || '',
      customerEmail: customerEmail || '',
      shippingAddress: shippingAddress || 'To be confirmed via WhatsApp',
      items,
      totalAmount: Number(totalAmount) || 0,
      orderType: orderType || 'WhatsApp Direct',
      whatsappMessage: whatsappMessage || ''
    });

    return res.status(201).json({ success: true, data: newOrder, message: 'Order inquiry registered' });
  } catch (error) {
    console.error('createOrder error:', error);
    res.status(500).json({ success: false, message: 'Failed to record order', error: error.message });
  }
};

// @desc    Get all orders for Admin
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: orders.length, data: orders });
    }

    const orders = store.getOrders();
    return res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve orders', error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (getIsMongoConnected()) {
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      return res.json({ success: true, data: order, message: 'Status updated' });
    }

    const order = store.updateOrderStatus(id, status);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.json({ success: true, data: order, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status', error: error.message });
  }
};

// @desc    Get Admin Dashboard Summary Metrics
// @route   GET /api/orders/dashboard-stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      const totalProducts = await Product.countDocuments();
      const outOfStock = await Product.countDocuments({
        $or: [{ inStock: false }, { stockQuantity: { $lte: 0 } }]
      });
      const totalCategories = await Category.countDocuments();
      const totalOrders = await Order.countDocuments();

      const orders = await Order.find().sort({ createdAt: -1 });
      const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
      const recentOrders = orders.slice(0, 5);

      return res.json({
        success: true,
        data: {
          totalProducts,
          outOfStock,
          totalCategories,
          totalOrders,
          totalRevenue,
          recentOrders
        }
      });
    }

    const stats = store.getDashboardStats();
    return res.json({ success: true, data: stats });
  } catch (error) {
    console.error('getDashboardStats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard metrics' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  getDashboardStats
};
