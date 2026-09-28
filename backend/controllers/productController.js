const Product = require('../models/Product');
const store = require('../config/store');
const { getIsMongoConnected } = require('../config/db');

// @desc    Get all products with dynamic category, price, size, material, inStock & search filters
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, size, material, inStock, search, sort, featured } = req.query;

    if (getIsMongoConnected()) {
      let query = {};

      if (category && category !== 'All') {
        query.category = new RegExp(`^${category}$`, 'i');
      }

      if (minPrice || maxPrice) {
        query.$or = [
          {
            discountedPrice: {
              ...(minPrice ? { $gte: Number(minPrice) } : {}),
              ...(maxPrice ? { $lte: Number(maxPrice) } : {})
            }
          },
          {
            discountedPrice: null,
            basePrice: {
              ...(minPrice ? { $gte: Number(minPrice) } : {}),
              ...(maxPrice ? { $lte: Number(maxPrice) } : {})
            }
          }
        ];
      }

      if (size) {
        const sizesArray = size.split(',');
        query.availableSizes = { $in: sizesArray };
      }

      if (material) {
        query.material = new RegExp(material, 'i');
      }

      if (inStock === 'true') {
        query.inStock = true;
        query.stockQuantity = { $gt: 0 };
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { sku: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { material: { $regex: search, $options: 'i' } }
        ];
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      let sortOptions = { createdAt: -1 };
      if (sort === 'price-low') sortOptions = { discountedPrice: 1, basePrice: 1 };
      if (sort === 'price-high') sortOptions = { discountedPrice: -1, basePrice: -1 };
      if (sort === 'rating') sortOptions = { rating: -1 };
      if (sort === 'newest') sortOptions = { createdAt: -1 };

      const products = await Product.find(query).sort(sortOptions);
      return res.json({ success: true, count: products.length, data: products });
    }

    // Fallback store
    const products = store.getProducts({ category, minPrice, maxPrice, size, material, inStock, search, sort, featured });
    return res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.error('getProducts error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving products', error: error.message });
  }
};

// @desc    Get single product by ID or Slug or SKU
// @route   GET /api/products/:idOrSlug
// @access  Public
const getProductById = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    if (getIsMongoConnected()) {
      let product = null;
      if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(idOrSlug);
      }
      if (!product) {
        product = await Product.findOne({
          $or: [{ slug: idOrSlug.toLowerCase() }, { sku: idOrSlug.toUpperCase() }]
        });
      }

      if (!product) {
        return res.status(404).json({ success: false, message: 'Jacket not found in atelier archive' });
      }
      return res.json({ success: true, data: product });
    }

    const product = store.getProductByIdOrSlug(idOrSlug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Jacket not found in atelier archive' });
    }
    return res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving product', error: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      basePrice,
      discountedPrice,
      images,
      availableSizes,
      colorVariants,
      material,
      fit,
      sku,
      stockQuantity,
      isFeatured,
      isNewArrival,
      details,
      careInstructions
    } = req.body;

    if (!title || !description || !category || !basePrice || !sku) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Title, Description, Category, Base Price, and SKU'
      });
    }

    const inStock = Number(stockQuantity) > 0;

    if (getIsMongoConnected()) {
      const existingSku = await Product.findOne({ sku: sku.toUpperCase() });
      if (existingSku) {
        return res.status(400).json({ success: false, message: `SKU ${sku} already exists` });
      }

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const product = await Product.create({
        title,
        slug,
        description,
        category,
        basePrice: Number(basePrice),
        discountedPrice: discountedPrice ? Number(discountedPrice) : null,
        images: images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'],
        availableSizes: availableSizes || ['S', 'M', 'L', 'XL'],
        colorVariants: colorVariants || [],
        material: material || 'Full-Grain Italian Leather',
        fit: fit || 'Tailored Fit',
        sku: sku.toUpperCase(),
        stockQuantity: Number(stockQuantity) || 10,
        inStock,
        isFeatured: Boolean(isFeatured),
        isNewArrival: Boolean(isNewArrival),
        details: details || [],
        careInstructions: careInstructions || 'Professional leather cleaning only.'
      });

      return res.status(201).json({ success: true, data: product, message: 'Jacket added successfully to catalog' });
    }

    // In-memory store
    const existingSku = store.products.find(p => p.sku.toUpperCase() === sku.toUpperCase());
    if (existingSku) {
      return res.status(400).json({ success: false, message: `SKU ${sku} already exists` });
    }

    const newProduct = store.createProduct({
      title,
      description,
      category,
      basePrice: Number(basePrice),
      discountedPrice: discountedPrice ? Number(discountedPrice) : null,
      images: images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'],
      availableSizes: availableSizes || ['S', 'M', 'L', 'XL'],
      colorVariants: colorVariants || [],
      material: material || 'Full-Grain Italian Leather',
      fit: fit || 'Tailored Fit',
      sku: sku.toUpperCase(),
      stockQuantity: Number(stockQuantity) || 10,
      inStock,
      isFeatured: Boolean(isFeatured),
      isNewArrival: Boolean(isNewArrival),
      details: details || [],
      careInstructions: careInstructions || 'Professional leather cleaning only.'
    });

    return res.status(201).json({ success: true, data: newProduct, message: 'Jacket added successfully to catalog' });
  } catch (error) {
    console.error('createProduct error:', error);
    res.status(500).json({ success: false, message: 'Failed to create jacket', error: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id || req.params.idOrSlug;

    if (getIsMongoConnected()) {
      let product = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(id);
      }
      if (!product) {
        product = await Product.findOne({ $or: [{ slug: id.toLowerCase() }, { sku: id.toUpperCase() }] });
      }

      if (!product) {
        return res.status(404).json({ success: false, message: 'Jacket not found' });
      }

      if (req.body.stockQuantity !== undefined) {
        req.body.inStock = Number(req.body.stockQuantity) > 0;
      }

      const updated = await Product.findByIdAndUpdate(product._id, req.body, {
        new: true,
        runValidators: true
      });

      return res.json({ success: true, data: updated, message: 'Jacket details updated successfully' });
    }

    const updated = store.updateProduct(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Jacket not found' });
    }

    return res.json({ success: true, data: updated, message: 'Jacket details updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id || req.params.idOrSlug;

    if (getIsMongoConnected()) {
      let product = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findByIdAndDelete(id);
      }
      if (!product) {
        product = await Product.findOneAndDelete({ $or: [{ slug: id.toLowerCase() }, { sku: id.toUpperCase() }] });
      }

      if (!product) {
        return res.status(404).json({ success: false, message: 'Jacket not found' });
      }
      return res.json({ success: true, message: 'Jacket deleted from archive' });
    }

    const success = store.deleteProduct(id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Jacket not found' });
    }

    return res.json({ success: true, message: 'Jacket deleted from archive' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
