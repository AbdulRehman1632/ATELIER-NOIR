import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Package,
  AlertTriangle,
  Grid,
  ShoppingBag,
  DollarSign,
  Plus,
  Search,
  Edit,
  Trash2,
  LogOut,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  MessageCircle,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { apiFetch } from '../utils/api';
import AdminProductModal from '../components/AdminProductModal';
import AdminDeleteModal from '../components/AdminDeleteModal';

export default function AdminDashboardPage() {
  const { adminUser, isAuthenticated, logout } = useAuth();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  // Tab state: 'inventory' | 'orders' | 'system'
  const [activeTab, setActiveTab] = useState('inventory');

  // Data states
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Table search & filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStock, setFilterStock] = useState('All');

  // Modals state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // null = Add, obj = Edit
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Notification feedback
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, prodRes, catRes, ordRes, healthRes] = await Promise.all([
        apiFetch('/orders/dashboard-stats'),
        apiFetch('/products'),
        apiFetch('/categories'),
        apiFetch('/orders'),
        apiFetch('/health')
      ]);

      setStats(statsRes.data);
      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
      setOrders(ordRes.data || []);
      setHealthStatus(healthRes);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      showNotification('Error refreshing dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  // Handle Save (Create or Update Product)
  const handleSaveProduct = async (productData, productId) => {
    try {
      if (productId) {
        // Update
        const res = await apiFetch(`/products/${productId}`, {
          method: 'PUT',
          body: JSON.stringify(productData)
        });
        showNotification(`Successfully updated "${productData.title}".`);
      } else {
        // Create
        const res = await apiFetch('/products', {
          method: 'POST',
          body: JSON.stringify(productData)
        });
        showNotification(`Added "${productData.title}" to catalog.`);
      }
      await loadAllData();
    } catch (err) {
      throw new Error(err.message || 'Failed to save jacket');
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await apiFetch(`/products/${productToDelete._id}`, {
        method: 'DELETE'
      });
      showNotification(`Deleted "${productToDelete.title}" from archive.`);
      setDeleteModalOpen(false);
      setProductToDelete(null);
      await loadAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to delete product');
    }
  };

  // Handle Order Status Change
  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await apiFetch(`/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      showNotification(`Order status updated to "${newStatus}".`);
      await loadAllData();
    } catch (err) {
      showNotification('Failed to update order status');
    }
  };

  // Filtered Products for the table
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === 'All' || p.category.toLowerCase() === filterCategory.toLowerCase();

    const matchesStock =
      filterStock === 'All'
        ? true
        : filterStock === 'InStock'
        ? p.inStock && p.stockQuantity > 0
        : !p.inStock || p.stockQuantity <= 0;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-atelier-950 border border-atelier-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold font-serif text-2xl font-bold">
            ⚜
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-neutral-100 tracking-wide">
                ATELIER NOIR MANAGEMENT
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-mono bg-gold text-atelier-950 font-bold">
                Admin
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5 font-light">
              Logged in as <strong className="text-neutral-200">{adminUser?.name || 'Administrator'}</strong> ({adminUser?.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            disabled={loading}
            className="p-2.5 rounded bg-atelier-900 border border-atelier-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-gold' : ''}`} />
          </button>

          <Link
            to="/shop"
            target="_blank"
            className="px-4 py-2 rounded bg-atelier-900 border border-atelier-800 text-neutral-300 hover:text-gold text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="px-4 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300 hover:bg-rose-900/80 text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-gold/15 border border-gold/40 text-gold rounded-lg text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Products */}
        <div className="bg-atelier-900/60 border border-atelier-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] tracking-widest uppercase font-mono">Catalog Items</span>
            <Package className="w-4 h-4 text-gold" />
          </div>
          <div className="font-serif text-2xl font-bold text-neutral-100">
            {stats?.totalProducts ?? products.length}
          </div>
          <div className="text-[10px] text-neutral-500">Active Jackets</div>
        </div>

        {/* Out of Stock */}
        <div className="bg-atelier-900/60 border border-atelier-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] tracking-widest uppercase font-mono">Sold Out</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="font-serif text-2xl font-bold text-rose-400">
            {stats?.outOfStock ?? products.filter((p) => !p.inStock || p.stockQuantity <= 0).length}
          </div>
          <div className="text-[10px] text-neutral-500">Zero inventory items</div>
        </div>

        {/* Total Categories */}
        <div className="bg-atelier-900/60 border border-atelier-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] tracking-widest uppercase font-mono">Categories</span>
            <Grid className="w-4 h-4 text-gold" />
          </div>
          <div className="font-serif text-2xl font-bold text-neutral-100">
            {stats?.totalCategories ?? categories.length}
          </div>
          <div className="text-[10px] text-neutral-500">Silhouettes</div>
        </div>

        {/* Total Orders / WhatsApp Inquiries */}
        <div className="bg-atelier-900/60 border border-atelier-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] tracking-widest uppercase font-mono">Orders Logged</span>
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-serif text-2xl font-bold text-neutral-100">
            {stats?.totalOrders ?? orders.length}
          </div>
          <div className="text-[10px] text-emerald-400">WhatsApp & Web</div>
        </div>

        {/* Order Revenue */}
        <div className="col-span-2 md:col-span-1 bg-atelier-900/60 border border-atelier-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] tracking-widest uppercase font-mono">Inquiry Value</span>
            <DollarSign className="w-4 h-4 text-gold" />
          </div>
          <div className="font-serif text-2xl font-bold text-gold">
            {formatPrice(stats?.totalRevenue ?? 3070)}
          </div>
          <div className="text-[10px] text-neutral-500">Gross pipeline</div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-atelier-800 gap-4 text-xs font-serif uppercase tracking-widest">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 border-b-2 transition ${
            activeTab === 'inventory'
              ? 'border-gold text-gold font-bold'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Product Management ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition ${
            activeTab === 'orders'
              ? 'border-gold text-gold font-bold'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          WhatsApp Orders & Inquiries ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`pb-3 border-b-2 transition ${
            activeTab === 'system'
              ? 'border-gold text-gold font-bold'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          System Health & Engine
        </button>
      </div>

      {/* TAB 1: PRODUCT INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          {/* Action & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-atelier-900/60 p-4 border border-atelier-800 rounded-xl">
            <div className="flex flex-1 items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search jacket title, SKU, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-atelier-950 border border-atelier-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold"
                />
              </div>

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-atelier-950 border border-atelier-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-gold"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>

              {/* Stock Status Filter */}
              <select
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
                className="bg-atelier-950 border border-atelier-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-gold"
              >
                <option value="All">All Stock Levels</option>
                <option value="InStock">In Stock Only</option>
                <option value="OutOfStock">Out of Stock Only</option>
              </select>
            </div>

            {/* Add New Jacket CTA */}
            <button
              onClick={() => {
                setSelectedProduct(null);
                setProductModalOpen(true);
              }}
              className="px-4 py-2 bg-gold hover:bg-gold-400 text-atelier-950 font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 shadow-luxury-gold transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Jacket</span>
            </button>
          </div>

          {/* Product Inventory Table */}
          <div className="overflow-x-auto rounded-xl border border-atelier-800 bg-atelier-950 shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-atelier-900/90 text-gold-300 uppercase tracking-widest font-mono border-b border-atelier-800">
                <tr>
                  <th className="p-3.5">Piece</th>
                  <th className="p-3.5">SKU & Category</th>
                  <th className="p-3.5">Pricing</th>
                  <th className="p-3.5">Inventory</th>
                  <th className="p-3.5">Color Variants</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier-850 text-neutral-300">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-neutral-500 font-serif">
                      No jackets match your current inventory search filter.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((prod) => {
                    const isOut = !prod.inStock || prod.stockQuantity <= 0;
                    return (
                      <tr key={prod._id} className="hover:bg-atelier-900/40 transition">
                        {/* Piece info & thumbnail */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.images?.[0] || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80'}
                              alt={prod.title}
                              className="w-12 h-14 object-cover object-center rounded bg-atelier-900 border border-atelier-800"
                            />
                            <div>
                              <Link
                                to={`/product/${prod.slug}`}
                                className="font-serif font-medium text-neutral-100 hover:text-gold transition text-xs line-clamp-1"
                              >
                                {prod.title}
                              </Link>
                              <span className="text-[10px] text-neutral-400 font-light block">
                                {prod.material}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* SKU & Category */}
                        <td className="p-3.5 font-mono">
                          <span className="text-gold font-medium block">{prod.sku}</span>
                          <span className="text-[11px] text-neutral-400">{prod.category}</span>
                        </td>

                        {/* Pricing */}
                        <td className="p-3.5 font-serif">
                          {prod.discountedPrice ? (
                            <div>
                              <span className="text-gold font-semibold block">{formatPrice(prod.discountedPrice)}</span>
                              <span className="text-[10px] text-neutral-500 line-through">{formatPrice(prod.basePrice)}</span>
                            </div>
                          ) : (
                            <span className="text-neutral-200 font-semibold">{formatPrice(prod.basePrice)}</span>
                          )}
                        </td>

                        {/* Stock Quantity */}
                        <td className="p-3.5">
                          {isOut ? (
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-rose-950 text-rose-300 border border-rose-800">
                              Sold Out (0)
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              <span className="font-mono text-neutral-200">{prod.stockQuantity} in vault</span>
                            </div>
                          )}
                        </td>

                        {/* Color Variants swatches */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-1">
                            {prod.colorVariants?.map((cv, i) => (
                              <span
                                key={i}
                                title={cv.name}
                                className="w-3.5 h-3.5 rounded-full border border-atelier-700 shadow-sm"
                                style={{ backgroundColor: cv.hex }}
                              />
                            ))}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedProduct(prod);
                                setProductModalOpen(true);
                              }}
                              className="p-1.5 rounded bg-atelier-900 border border-atelier-800 hover:border-gold hover:text-gold text-neutral-300 transition"
                              title="Edit Jacket Details"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setProductToDelete(prod);
                                setDeleteModalOpen(true);
                              }}
                              className="p-1.5 rounded bg-atelier-900 border border-atelier-800 hover:border-rose-600 hover:text-rose-400 text-neutral-300 transition"
                              title="Delete Jacket"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: WHATSAPP ORDERS & CONCIERGE INQUIRIES */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-atelier-900/60 p-4 border border-atelier-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-neutral-200">
                Direct WhatsApp inquiries and web reservations logged in real time.
              </span>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">
              Total Logged: {orders.length}
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-atelier-800 bg-atelier-950 shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-atelier-900/90 text-gold-300 uppercase tracking-widest font-mono border-b border-atelier-800">
                <tr>
                  <th className="p-3.5">Order ID & Date</th>
                  <th className="p-3.5">Client Contact</th>
                  <th className="p-3.5">Reserved Jackets</th>
                  <th className="p-3.5">Value</th>
                  <th className="p-3.5">Concierge Status</th>
                  <th className="p-3.5">WhatsApp Inquiry Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier-850 text-neutral-300">
                {orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-atelier-900/40 transition">
                    <td className="p-3.5 font-mono">
                      <span className="text-gold font-bold block">{ord.orderNumber}</span>
                      <span className="text-[10px] text-neutral-500">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-neutral-100 block">{ord.customerName}</span>
                      <span className="text-[10px] text-neutral-400 block font-mono">{ord.customerPhone}</span>
                      <span className="text-[10px] text-neutral-500">{ord.customerEmail}</span>
                    </td>

                    <td className="p-3.5">
                      <div className="space-y-1">
                        {ord.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <span className="text-gold font-mono">{item.quantity}x</span>
                            <span className="text-neutral-200">{item.title}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              ({item.size}, {item.color})
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-3.5 font-serif font-bold text-neutral-100">
                      {formatPrice(ord.totalAmount)}
                    </td>

                    <td className="p-3.5">
                      <select
                        value={ord.status}
                        onChange={(e) => handleOrderStatusUpdate(ord._id, e.target.value)}
                        className={`px-2.5 py-1.5 rounded text-[11px] font-medium border bg-atelier-950 focus:outline-none ${
                          ord.status.includes('Confirmed')
                            ? 'text-emerald-400 border-emerald-800'
                            : ord.status.includes('Tailoring')
                            ? 'text-gold border-gold/40'
                            : ord.status.includes('Dispatched')
                            ? 'text-blue-400 border-blue-800'
                            : 'text-amber-400 border-amber-800'
                        }`}
                      >
                        <option value="Pending Concierge Verification">Pending Concierge Verification</option>
                        <option value="Confirmed via WhatsApp">Confirmed via WhatsApp</option>
                        <option value="In Tailoring">In Tailoring</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>

                    <td className="p-3.5 max-w-xs text-[11px] text-neutral-400 font-light truncate">
                      {ord.whatsappMessage || 'Inquiry initiated via direct product CTA'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM HEALTH & ARCHITECTURE */}
      {activeTab === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-atelier-950 border border-atelier-800 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-gold">
              <Activity className="w-5 h-5" />
              <h3 className="font-serif text-base uppercase tracking-wider font-semibold">
                Backend Engine Status
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-atelier-850">
                <span className="text-neutral-400">Database Layer:</span>
                <span className="font-mono text-emerald-400 font-semibold">{healthStatus?.database || 'Active'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-atelier-850">
                <span className="text-neutral-400">Backend Port:</span>
                <span className="font-mono text-neutral-200">5000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-atelier-850">
                <span className="text-neutral-400">Frontend Port:</span>
                <span className="font-mono text-neutral-200">3000 (Vite)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-atelier-850">
                <span className="text-neutral-400">Authentication:</span>
                <span className="font-mono text-gold">JWT + bcrypt (Active)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-400">WhatsApp Concierge Gateway:</span>
                <span className="font-mono text-emerald-400 font-semibold">+1 (555) 019-2834</span>
              </div>
            </div>
          </div>

          <div className="bg-atelier-950 border border-atelier-800 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-gold">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-serif text-base uppercase tracking-wider font-semibold">
                MERN Stack Architecture
              </h3>
            </div>
            <ul className="text-xs text-neutral-300 space-y-2 font-light">
              <li>• <strong>React.js:</strong> SPA with React Router v6 & Context API for Cart, Wishlist, Currency, Auth.</li>
              <li>• <strong>Styling:</strong> Tailwind CSS with luxury dark palette, Cinzel & Plus Jakarta typography.</li>
              <li>• <strong>Node.js & Express:</strong> REST API architecture with JWT authentication middleware.</li>
              <li>• <strong>MongoDB & Mongoose:</strong> Native schemas for Product, User, Category, Order with in-memory resilience.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Add / Edit Jacket Modal */}
      <AdminProductModal
        isOpen={productModalOpen}
        onClose={() => {
          setProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
        product={selectedProduct}
        categories={categories}
      />

      {/* Delete Confirmation Modal */}
      <AdminDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteProduct}
        productTitle={productToDelete?.title}
      />
    </div>
  );
}
