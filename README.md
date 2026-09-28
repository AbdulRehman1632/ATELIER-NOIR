# ATELIER NOIR — Haute Maroquinerie & Luxury Jackets E-Commerce
### Modern Full-Stack MERN E-Commerce Web Application

**Atelier Noir** is a premium, high-fashion outerwear web application crafted specifically for high-end jacket brands. Built using the **MERN** stack (React.js, Node.js, Express.js, MongoDB), it couples an obsidian & warm gold luxury aesthetic with bespoke customer concierge tools, multi-attribute filtering, dynamic color swatches, and automated WhatsApp direct ordering.

---

## 🏛️ System Architecture & Technology Stack

| Layer | Technologies & Libraries |
|---|---|
| **Frontend** | React.js (SPA with React Router v6), Tailwind CSS, Framer Motion, Lucide React Icons |
| **State Management** | React Context API (Cart, Wishlist, Currency, Admin Auth) with LocalStorage persistence |
| **Backend** | Node.js, Express.js REST API Architecture, CORS, Morgan |
| **Database** | MongoDB with Mongoose ORM & high-performance resilient in-memory fallback |
| **Security** | JSON Web Tokens (JWT), bcrypt password hashing, input validation |
| **Ordering** | WhatsApp Concierge Chatbot & Automated Pre-filled Order Engine |

---

## ✨ Key Capabilities & UI/UX Features

### 1. Upgraded Luxury Aesthetic
- **Visual Design:** Bespoke dark theme with obsidian (`#08080A`), champagne gold (`#C5A880`), subtle glassmorphism (`backdrop-blur-md`), and typography inspired by European tailoring houses (*Cinzel* & *Plus Jakarta Sans*).
- **Navigation:** Announcement bar, currency switcher (USD `$`, EUR `€`, GBP `£`), search modal, interactive wishlist badge, and sliding luxury cart drawer.
- **Craftsmanship Pillars:** Detailed spotlights on Italian full-grain calfskin, Spanish merino shearling, Florentine suede, and palladium hardware.

### 2. Dynamic Categories & Advanced Filtering
- **Silhouettes & Categories:**
  - *Biker Jackets* (Double-rider, asymmetrical, café racer)
  - *Bomber Jackets* (Flight jackets, shearling-trimmed)
  - *Trench Coats* (Double-breasted gabardine & cashmere-wool)
  - *Leather Blousons* (Tuscan split suede & aniline lambskin)
  - *Puffer Jackets* (800-fill goose down & ripstop technical nylon)
  - *Shearling Aviators* (Icelandic fleece & heavyweight leather)
- **Multi-attribute Refinement:**
  - Interactive **Price Ceiling Slider** ($500 – $2,000+)
  - **Size Selector Pills** (S, M, L, XL, XXL) with multi-select support
  - **Material Filter** (Italian Calfskin, Florentine Suede, Merino Shearling, etc.)
  - **In-Stock Only Toggle** to exclude sold-out archive pieces
  - **Sorting Options** (Newest, Price: Low to High, Price: High to Low, Highest Rated)

### 3. Interactive Color Selection & Product Detail Page (PDP)
- **Visual Color Swatches:** Swatches displayed on both catalog product cards and Product Detail Pages. Clicking any color swatch dynamically updates the garment preview image.
- **Interactive Multi-Image Gallery:** Thumbnail switcher and mouse hover zoom magnifier for inspecting leather grain and stitching.
- **Interactive Size Guide Modal:** Switchable between Imperial (inches) and Metric (centimeters) with chest, sleeve, shoulder, length, and body weight recommendations.
- **Dual CTA System:** Instant "Add to Atelier Bag" drawer trigger alongside direct "Order via WhatsApp".

### 4. WhatsApp Chatbot & Direct Ordering System
- **Floating WhatsApp Concierge Widget:** Embedded on every page with an online status indicator and quick inquiry prompt triggers:
  1. *"Ask about sizing & fit recommendations"*
  2. *"Custom bespoke leather inquiry"*
  3. *"Track an existing order status"*
  4. *"Speak with Master Tailor"*
- **Automated WhatsApp Order Pre-fill:**
  Clicking "Order via WhatsApp" formats and opens a direct chat populated with:
  ```text
  ⚜️ ATELIER NOIR — DIRECT ORDER INQUIRY ⚜️
  ━━━━━━━━━━━━━━━━━━━━━━━━━━
  Jacket: The Sovereign Double Rider Biker
  SKU: ATN-BKR-001
  Color: Obsidian Black
  Size: L
  Quantity: 1
  Unit Price: $790
  Total Value: $790
  Item Archive Link: http://localhost:3000/product/the-sovereign-double-rider-biker
  ━━━━━━━━━━━━━━━━━━━━━━━━━━
  Client Note: Hello Atelier Concierge, I would like to reserve and finalize payment/tailoring for this jacket.
  ```
- Automatically registers direct inquiries and bag reservations in the Admin Order Log.

### 5. Full-Featured Admin Portal (CRUD & Inventory Management)
- **Admin Authentication:** Secure JWT-based route with password verification (`admin@ateliernoir.com` / `Admin@12345`).
- **Dashboard Overview Metrics:**
  - Total Active Jackets in Catalog
  - Out of Stock / Sold Out Items
  - Total Silhouette Categories
  - Logged WhatsApp Orders & Inquiries
  - Pipeline Inquired Revenue
- **Product Management (CRUD):**
  - **Add New Jacket:** Form with Title, SKU, Category, Base Price, Discounted Price, Available Sizes, Color Variants (Hex + Name + Swatch Image), Material, Fit, Stock Quantity, Description, and Image URLs.
  - **Edit Jacket:** Modal editor with pre-populated values for fast inventory adjustments.
  - **Delete Jacket:** Confirmation modal with permanent archive safeguard.
  - **Search & Filter:** Table filter by title, SKU, silhouette category, and stock status.
- **WhatsApp Order Inquiries Log:** Real-time tracking of client inquiries with status dropdown (*Pending Concierge Verification*, *Confirmed via WhatsApp*, *In Tailoring*, *Dispatched*, *Delivered*).

---

## 🗄️ Database Schemas (MongoDB / Mongoose)

### 1. `Product` Schema (`backend/models/Product.js`)
```javascript
{
  title: { type: String, required: true, trim: true },
  slug: { type: String, lowercase: true, trim: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Biker Jackets', 'Bomber Jackets', 'Trench Coats', 'Leather Blousons', 'Puffer Jackets', 'Shearling Aviators'] 
  },
  basePrice: { type: Number, required: true },
  discountedPrice: { type: Number, default: null },
  images: [{ type: String }],
  availableSizes: [{ type: String, enum: ['S', 'M', 'L', 'XL', 'XXL'] }],
  colorVariants: [{
    name: { type: String, required: true },
    hex: { type: String, required: true },
    image: { type: String, required: true }
  }],
  material: { type: String, required: true },
  fit: { type: String, default: 'Tailored Slim Fit' },
  sku: { type: String, required: true, unique: true, uppercase: true },
  stockQuantity: { type: Number, required: true, default: 10 },
  inStock: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 12 },
  details: [{ type: String }],
  careInstructions: { type: String }
}
```

### 2. `User` (Admin) Schema (`backend/models/User.js`)
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // Hashed with bcryptjs (salt 10)
  role: { type: String, enum: ['admin', 'manager', 'customer'], default: 'admin' }
}
```

### 3. `Category` Schema (`backend/models/Category.js`)
```javascript
{
  name: { type: String, required: true, unique: true },
  slug: { type: String, lowercase: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  itemCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: true }
}
```

### 4. `Order` Schema (`backend/models/Order.js`)
```javascript
{
  orderNumber: { type: String, required: true, unique: true },
  customerName: { type: String, default: 'VIP Client' },
  customerPhone: { type: String },
  customerEmail: { type: String },
  shippingAddress: { type: String },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: String,
    sku: String,
    color: String,
    size: String,
    quantity: Number,
    price: Number,
    image: String
  }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending Concierge Verification', 'Confirmed via WhatsApp', 'In Tailoring', 'Dispatched', 'Delivered'],
    default: 'Pending Concierge Verification'
  },
  orderType: { type: String, default: 'WhatsApp Direct' },
  whatsappMessage: { type: String }
}
```

---

## 📦 Seeded Jacket Catalog (10 Masterpieces)

The database is pre-seeded with 10 high-resolution luxury jackets:
1. **The Sovereign Double Rider Biker** (Italian Calfskin, Obsidian / Oxblood / Cognac)
2. **Aero Commander Shearling Bomber** (Spanish Merino Wool, Espresso / Midnight Charcoal)
3. **Westminster Storm Technical Trench** (Waterproof Gabardine & Leather Straps)
4. **Milano Suede Minimalist Blouson** (Florentine Split Suede, Sandstone / Tobacco)
5. **Apex Quilted Down Puffer Jacket** (800-Fill European White Goose Down)
6. **Vanguard Heritage Shearling Aviator** (Icelandic Fleece & Heavyweight Patina)
7. **Monaco Café Racer Leather Jacket** (Vegetable-Tanned Lambskin & British Racing Green)
8. **Savile Row Cashmere-Wool Trench Overcoat** (650g Virgin Wool & Mongolian Cashmere)
9. **Kensington Zip-Front Lambskin Blouson** (Full-Aniline Glove-Tanned Nappa)
10. **Nordic Expedition Arctic Puffer** (Marked as Sold Out / 0 in vault for immediate inventory validation)

---

## 🚀 Setup & Launch Instructions

### 1. Prerequisites
- **Node.js** (v18.0 or higher installed)
- **MongoDB** (Local `mongod` service or MongoDB Atlas cloud connection string).
  *Note: The backend features an intelligent dual-mode persistence architecture: if MongoDB is running, Mongoose models persist directly; if MongoDB is not running locally, the system activates an in-memory store so all APIs, Admin panel, and filtering work immediately without setup hurdles.*

### 2. Environment Variables (`.env`)
The backend `.env` file is located at `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/atelier_jackets
JWT_SECRET=atelier_luxury_jackets_super_secret_jwt_key_2026
ADMIN_EMAIL=admin@ateliernoir.com
ADMIN_PASSWORD=Admin@12345
WHATSAPP_PHONE=15550192834
NODE_ENV=development
```

### 3. Seeding MongoDB Database
To populate your local or Atlas MongoDB with the 10 luxury jackets and default administrator:
```bash
cd backend
npm run seed
```

### 4. Running the Express Backend
```bash
cd backend
npm start
# Server listens on http://localhost:5000
```

### 5. Running the React Frontend
```bash
cd frontend
npm start
# Application launches on http://localhost:3000
```

---

## 🔑 Default Administrator Credentials

| Field | Value |
|---|---|
| **Portal URL** | [http://localhost:3000/admin/login](http://localhost:3000/admin/login) |
| **Email** | `admin@ateliernoir.com` |
| **Password** | `Admin@12345` |
| **Quick Action** | Click *"Auto-fill Admin Credentials"* on the login page |

---

## 🌐 REST API Endpoints Overview

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/products` | Retrieve catalog with category, price, size, material, search filters | Public |
| `GET` | `/api/products/:idOrSlug` | Retrieve single jacket by ID, Slug, or SKU | Public |
| `POST` | `/api/products` | Add new jacket to inventory | Admin (JWT) |
| `PUT` | `/api/products/:idOrSlug` | Update jacket details & inventory | Admin (JWT) |
| `DELETE` | `/api/products/:idOrSlug` | Delete jacket from archive | Admin (JWT) |
| `GET` | `/api/categories` | Get all jacket categories with item counts | Public |
| `POST` | `/api/auth/login` | Admin authentication & JWT token generation | Public |
| `GET` | `/api/orders` | Get order inquiries & WhatsApp requests | Admin (JWT) |
| `POST` | `/api/orders` | Log WhatsApp direct inquiry / cart checkout | Public |
| `PUT` | `/api/orders/:id/status` | Update concierge order status | Admin (JWT) |
| `GET` | `/api/orders/dashboard-stats`| Summary overview metrics for admin dashboard | Admin (JWT) |
| `GET` | `/api/health` | System health and database engine status | Public |
