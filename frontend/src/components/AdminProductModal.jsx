import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image, Layers, DollarSign, Tag, Check } from 'lucide-react';

export default function AdminProductModal({ isOpen, onClose, onSave, product = null, categories = [] }) {
  const isEdit = Boolean(product);

  const [formData, setFormData] = useState({
    title: '',
    sku: '',
    category: 'Biker Jackets',
    basePrice: '',
    discountedPrice: '',
    material: '',
    fit: 'Tailored Slim Fit',
    stockQuantity: 10,
    description: '',
    careInstructions: 'Professional leather cleaning only.',
    images: [''],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colorVariants: [
      { name: 'Obsidian Black', hex: '#111111', image: '' }
    ]
  });

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        sku: product.sku || '',
        category: product.category || 'Biker Jackets',
        basePrice: product.basePrice || '',
        discountedPrice: product.discountedPrice || '',
        material: product.material || '',
        fit: product.fit || 'Tailored Slim Fit',
        stockQuantity: product.stockQuantity !== undefined ? product.stockQuantity : 10,
        description: product.description || '',
        careInstructions: product.careInstructions || 'Professional leather cleaning only.',
        images: product.images && product.images.length > 0 ? product.images : [''],
        availableSizes: product.availableSizes || ['S', 'M', 'L', 'XL'],
        colorVariants: product.colorVariants && product.colorVariants.length > 0
          ? product.colorVariants
          : [{ name: 'Obsidian Black', hex: '#111111', image: '' }]
      });
    } else {
      setFormData({
        title: '',
        sku: `ATN-JKT-${Math.floor(100 + Math.random() * 900)}`,
        category: categories[0]?.name || 'Biker Jackets',
        basePrice: '',
        discountedPrice: '',
        material: 'Full-Grain Italian Calfskin',
        fit: 'Tailored Slim Fit',
        stockQuantity: 12,
        description: '',
        careInstructions: 'Professional leather cleaning only. Store on wooden hanger.',
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'],
        availableSizes: ['S', 'M', 'L', 'XL'],
        colorVariants: [
          {
            name: 'Obsidian Black',
            hex: '#111111',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      });
    }
    setError(null);
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image helpers
  const handleImageChange = (idx, value) => {
    const updated = [...formData.images];
    updated[idx] = value;
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (idx) => {
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  // Color variant helpers
  const handleColorChange = (idx, field, value) => {
    const updated = [...formData.colorVariants];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData((prev) => ({ ...prev, colorVariants: updated }));
  };

  const addColorVariant = () => {
    setFormData((prev) => ({
      ...prev,
      colorVariants: [
        ...prev.colorVariants,
        { name: 'Vintage Cognac', hex: '#6E3B1F', image: formData.images[0] || '' }
      ]
    }));
  };

  const removeColorVariant = (idx) => {
    setFormData((prev) => ({
      ...prev,
      colorVariants: prev.colorVariants.filter((_, i) => i !== idx)
    }));
  };

  // Size helpers
  const toggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.availableSizes.includes(size);
      return {
        ...prev,
        availableSizes: exists
          ? prev.availableSizes.filter((s) => s !== size)
          : [...prev.availableSizes, size]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.sku || !formData.basePrice || !formData.description) {
      setError('Please fill all mandatory fields: Title, SKU, Base Price, and Description.');
      return;
    }

    setSubmitting(true);
    try {
      const cleanData = {
        ...formData,
        basePrice: Number(formData.basePrice),
        discountedPrice: formData.discountedPrice ? Number(formData.discountedPrice) : null,
        stockQuantity: Number(formData.stockQuantity),
        images: formData.images.filter((img) => img.trim() !== '')
      };

      await onSave(cleanData, product?._id);
      onClose();
    } catch (err) {
      setError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const sizesList = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-atelier-950 border border-atelier-800 rounded-xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-atelier-800">
          <div>
            <span className="text-[10px] tracking-widest text-gold uppercase font-mono">
              {isEdit ? 'ARCHIVE RECORD MODIFICATION' : 'NEW LUXURY ENTRY'}
            </span>
            <h3 className="font-serif text-xl tracking-wider text-neutral-100 font-bold">
              {isEdit ? `Edit Jacket: ${product.title}` : 'Add New Mastercrafted Jacket'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-950/60 border border-rose-800 rounded text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6 text-xs">
          {/* Row 1: Title & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-neutral-400 uppercase tracking-wider font-medium">Jacket Title *</label>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. The Sovereign Double Rider Biker"
                className="w-full bg-atelier-900 border border-atelier-800 rounded p-2.5 text-neutral-100 focus:outline-none focus:border-gold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-neutral-400 uppercase tracking-wider font-medium">SKU Code *</label>
              <input
                type="text"
                required
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. ATN-BKR-001"
                className="w-full bg-atelier-900 border border-atelier-800 rounded p-2.5 font-mono text-gold focus:outline-none focus:border-gold uppercase"
              />
            </div>
          </div>

          {/* Row 2: Category, Base Price, Discounted Price, Stock */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-neutral-400 uppercase tracking-wider font-medium">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-atelier-900 border border-atelier-800 rounded p-2.5 text-neutral-100 focus:outline-none focus:border-gold"
              >
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))
                ) : (
                  <>
                    <option value="Biker Jackets">Biker Jackets</option>
                    <option value="Bomber Jackets">Bomber Jackets</option>
                    <option value="Trench Coats">Trench Coats</option>
                    <option value="Leather Blousons">Leather Blousons</option>
                    <option value="Puffer Jackets">Puffer Jackets</option>
                    <option value="Shearling Aviators">Shearling Aviators</option>
                  </>
                )}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 uppercase tracking-wider font-medium">Base Price ($) *</label>
              <input
                type="number"
                required
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                placeholder="890"
                min="0"
                className="w-full bg-atelier-900 border border-atelier-800 rounded p-2.5 text-neutral-100 font-mono focus:outline-none focus:border-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 uppercase tracking-wider font-medium">Discount Price ($)</label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                placeholder="Optional sale"
                min="0"
                className="w-full bg-atelier-900 border border-atelier-800 rounded p-2.5 text-neutral-100 font-mono focus:outline-none focus:border-gold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 uppercase tracking-wider font-medium">Stock Quantity *</label>
              <input
                type="number"
                required
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="10"
                min="0"
                className="w-full bg-atelier-900 border border-atelier-800 rounded p-2.5 text-neutral-100 font-mono focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Row 3: Material & Fit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-neutral-400 uppercase tracking-wider font-medium">Primary Material *</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="e.g. 1.2mm Italian Full-Grain Calfskin"
                className="w-full bg-atelier-900 border border-atelier-800 rounded p-2.5 text-neutral-100 focus:outline-none focus:border-gold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-neutral-400 uppercase tracking-wider font-medium">Tailored Silhouette / Fit</label>
              <input
                type="text"
                name="fit"
                value={formData.fit}
                onChange={handleChange}
                placeholder="e.g. Tailored Slim Fit"
                className="w-full bg-atelier-900 border border-atelier-800 rounded p-2.5 text-neutral-100 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Available Sizes Checkboxes */}
          <div className="space-y-2">
            <label className="text-neutral-400 uppercase tracking-wider font-medium block">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {sizesList.map((sz) => {
                const active = formData.availableSizes.includes(sz);
                return (
                  <button
                    type="button"
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`px-4 py-2 rounded font-mono text-xs transition border ${
                      active
                        ? 'bg-gold text-atelier-950 font-bold border-gold'
                        : 'bg-atelier-900 text-neutral-400 border-atelier-800 hover:text-white'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Variants: Hex + Image Link + Name */}
          <div className="space-y-3 pt-2 border-t border-atelier-800">
            <div className="flex items-center justify-between">
              <label className="text-neutral-400 uppercase tracking-wider font-medium">
                Color Variants (Hex code + Image link)
              </label>
              <button
                type="button"
                onClick={addColorVariant}
                className="text-gold hover:text-gold-300 flex items-center gap-1 text-[11px] uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Variant</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.colorVariants.map((color, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-atelier-900/60 p-2.5 rounded border border-atelier-800">
                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) => handleColorChange(idx, 'hex', e.target.value)}
                    className="w-8 h-8 rounded border border-atelier-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color.name}
                    onChange={(e) => handleColorChange(idx, 'name', e.target.value)}
                    placeholder="Color Name (e.g. Obsidian Black)"
                    className="w-1/3 bg-atelier-900 border border-atelier-700 rounded p-1.5 text-xs text-neutral-100"
                  />
                  <input
                    type="url"
                    value={color.image}
                    onChange={(e) => handleColorChange(idx, 'image', e.target.value)}
                    placeholder="Swatch Preview Image URL"
                    className="flex-1 bg-atelier-900 border border-atelier-700 rounded p-1.5 text-xs text-neutral-100"
                  />
                  {formData.colorVariants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeColorVariant(idx)}
                      className="text-neutral-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Multiple Image URLs */}
          <div className="space-y-3 pt-2 border-t border-atelier-800">
            <div className="flex items-center justify-between">
              <label className="text-neutral-400 uppercase tracking-wider font-medium">
                Gallery Image URLs
              </label>
              <button
                type="button"
                onClick={addImageField}
                className="text-gold hover:text-gold-300 flex items-center gap-1 text-[11px] uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.images.map((imgUrl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="url"
                    value={imgUrl}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-atelier-900 border border-atelier-800 rounded p-2 text-xs text-neutral-100 focus:outline-none focus:border-gold"
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(idx)}
                      className="text-neutral-500 hover:text-rose-400 p-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Description & Care */}
          <div className="space-y-1">
            <label className="text-neutral-400 uppercase tracking-wider font-medium">Description *</label>
            <textarea
              required
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed luxury product description and craftsmanship notes..."
              className="w-full bg-atelier-900 border border-atelier-800 rounded p-2.5 text-neutral-100 focus:outline-none focus:border-gold"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-atelier-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded bg-atelier-900 text-neutral-300 hover:text-white transition uppercase tracking-wider text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded bg-gold hover:bg-gold-400 disabled:opacity-50 text-atelier-950 font-bold tracking-widest uppercase text-xs transition"
            >
              {submitting ? 'Archiving...' : isEdit ? 'Update Jacket' : 'Save To Archive'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
