const mongoose = require('mongoose');

const colorVariantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  image: { type: String, required: true }
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a product title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description']
    },
    category: {
      type: String,
      required: [true, 'Please specify a jacket category'],
      enum: [
        'Biker Jackets',
        'Bomber Jackets',
        'Trench Coats',
        'Leather Blousons',
        'Puffer Jackets',
        'Shearling Aviators'
      ]
    },
    basePrice: {
      type: Number,
      required: [true, 'Please provide a base price'],
      min: [0, 'Price must be positive']
    },
    discountedPrice: {
      type: Number,
      default: null
    },
    images: {
      type: [String],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'A jacket must have at least one image'
      }
    },
    availableSizes: {
      type: [String],
      enum: ['S', 'M', 'L', 'XL', 'XXL'],
      default: ['S', 'M', 'L', 'XL']
    },
    colorVariants: {
      type: [colorVariantSchema],
      default: []
    },
    material: {
      type: String,
      required: [true, 'Please specify the premium material'],
      trim: true
    },
    fit: {
      type: String,
      default: 'Slim Tailored',
      trim: true
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 10
    },
    inStock: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 4.9,
      min: 1,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 18
    },
    details: {
      type: [String],
      default: []
    },
    careInstructions: {
      type: String,
      default: 'Professional leather cleaning only. Store on shaped wooden hanger away from direct sunlight.'
    }
  },
  {
    timestamps: true
  }
);

// Pre-save to auto-sync inStock based on stockQuantity
productSchema.pre('save', function (next) {
  if (this.stockQuantity <= 0) {
    this.inStock = false;
  } else {
    this.inStock = true;
  }
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
