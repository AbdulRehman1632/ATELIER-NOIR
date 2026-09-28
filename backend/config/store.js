const bcrypt = require('bcryptjs');
const { products: initialProducts, categories: initialCategories, sampleOrders: initialOrders } = require('../seed/seedData');

class ResilientStore {
  constructor() {
    this.categories = JSON.parse(JSON.stringify(initialCategories)).map((cat, idx) => ({
      _id: `cat_${idx + 1}`,
      ...cat,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    this.products = JSON.parse(JSON.stringify(initialProducts)).map((prod, idx) => ({
      _id: `prod_${idx + 1}`,
      ...prod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    this.orders = JSON.parse(JSON.stringify(initialOrders)).map((ord, idx) => ({
      _id: `ord_${idx + 1}`,
      ...ord,
      createdAt: new Date(Date.now() - idx * 86400000).toISOString(),
      updatedAt: new Date().toISOString()
    }));

    this.users = [];
    this.initAdmin();
  }

  async initAdmin() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@12345', salt);
    this.users = [
      {
        _id: 'usr_admin_1',
        name: 'Atelier Noir Master Admin',
        email: 'admin@ateliernoir.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
  }

  // Products
  getProducts(filters = {}) {
    let result = [...this.products];

    if (filters.category && filters.category !== 'All') {
      result = result.filter(
        p => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.minPrice !== undefined && filters.minPrice !== '') {
      result = result.filter(p => {
        const price = p.discountedPrice || p.basePrice;
        return price >= Number(filters.minPrice);
      });
    }

    if (filters.maxPrice !== undefined && filters.maxPrice !== '') {
      result = result.filter(p => {
        const price = p.discountedPrice || p.basePrice;
        return price <= Number(filters.maxPrice);
      });
    }

    if (filters.size) {
      const sizes = Array.isArray(filters.size) ? filters.size : filters.size.split(',');
      result = result.filter(p => p.availableSizes && p.availableSizes.some(s => sizes.includes(s)));
    }

    if (filters.material) {
      result = result.filter(p =>
        p.material && p.material.toLowerCase().includes(filters.material.toLowerCase())
      );
    }

    if (filters.inStock === 'true' || filters.inStock === true) {
      result = result.filter(p => p.inStock && p.stockQuantity > 0);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      );
    }

    if (filters.featured === 'true' || filters.featured === true) {
      result = result.filter(p => p.isFeatured);
    }

    // Sort
    if (filters.sort) {
      switch (filters.sort) {
        case 'price-low':
          result.sort((a, b) => (a.discountedPrice || a.basePrice) - (b.discountedPrice || b.basePrice));
          break;
        case 'price-high':
          result.sort((a, b) => (b.discountedPrice || b.basePrice) - (a.discountedPrice || a.basePrice));
          break;
        case 'rating':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          break;
      }
    }

    return result;
  }

  getProductByIdOrSlug(idOrSlug) {
    return this.products.find(p => p._id === idOrSlug || p.slug === idOrSlug || p.sku === idOrSlug);
  }

  createProduct(data) {
    const slug = (data.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProduct = {
      _id: `prod_${Date.now()}`,
      slug,
      inStock: (data.stockQuantity || 0) > 0,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id, data) {
    const index = this.products.findIndex(p => p._id === id || p.slug === id || p.sku === id);
    if (index === -1) return null;

    if (data.stockQuantity !== undefined) {
      data.inStock = Number(data.stockQuantity) > 0;
    }

    this.products[index] = {
      ...this.products[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p._id === id || p.slug === id || p.sku === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  // Categories
  getCategories() {
    return this.categories;
  }

  createCategory(data) {
    const slug = (data.name || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const newCategory = {
      _id: `cat_${Date.now()}`,
      slug,
      itemCount: 0,
      createdAt: new Date().toISOString(),
      ...data
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  // Users / Admin
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  // Orders
  getOrders() {
    return this.orders;
  }

  createOrder(data) {
    const newOrder = {
      _id: `ord_${Date.now()}`,
      orderNumber: `ATN-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending Concierge Verification',
      orderType: 'WhatsApp Direct',
      ...data
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateOrderStatus(id, status) {
    const order = this.orders.find(o => o._id === id || o.orderNumber === id);
    if (!order) return null;
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  getDashboardStats() {
    const totalProducts = this.products.length;
    const outOfStock = this.products.filter(p => !p.inStock || p.stockQuantity <= 0).length;
    const totalCategories = this.categories.length;
    const totalOrders = this.orders.length;
    const totalRevenue = this.orders.reduce((sum, ord) => sum + (Number(ord.totalAmount) || 0), 0);
    const recentOrders = this.orders.slice(0, 5);

    return {
      totalProducts,
      outOfStock,
      totalCategories,
      totalOrders,
      totalRevenue,
      recentOrders
    };
  }
}

const store = new ResilientStore();
module.exports = store;
