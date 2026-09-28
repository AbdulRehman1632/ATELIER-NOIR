const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  title: { type: String, required: true },
  slug: { type: String },
  sku: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },
    customerName: {
      type: String,
      default: 'Guest Client'
    },
    customerPhone: {
      type: String,
      default: ''
    },
    customerEmail: {
      type: String,
      default: ''
    },
    shippingAddress: {
      type: String,
      default: 'Pending Client Confirmation via WhatsApp'
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: [
        'Pending Concierge Verification',
        'Confirmed via WhatsApp',
        'In Tailoring',
        'Dispatched',
        'Delivered',
        'Cancelled'
      ],
      default: 'Pending Concierge Verification'
    },
    orderType: {
      type: String,
      enum: ['WhatsApp Direct', 'Web Checkout', 'Custom Bespoke'],
      default: 'WhatsApp Direct'
    },
    whatsappMessage: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
