import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function FilterSidebar({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedSizes,
  setSelectedSizes,
  selectedMaterial,
  setSelectedMaterial,
  inStockOnly,
  setInStockOnly,
  onResetFilters
}) {
  const { formatPrice } = useCurrency();

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const materials = [
    { label: 'All Materials', value: '' },
    { label: 'Italian Calfskin', value: 'Calfskin' },
    { label: 'Florentine Suede', value: 'Suede' },
    { label: 'Aniline Lambskin', value: 'Lambskin' },
    { label: 'Merino Shearling', value: 'Shearling' },
    { label: 'Gabardine Twill', value: 'Gabardine' },
    { label: 'Cashmere-Wool', value: 'Cashmere' },
    { label: 'Goose Down / Nylon', value: 'Down' }
  ];

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <aside className="w-full bg-atelier-900/70 border border-atelier-800 p-5 rounded-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-atelier-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gold" />
          <h3 className="font-serif text-sm tracking-widest uppercase text-neutral-100 font-semibold">
            REFINE ARCHIVE
          </h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-[11px] text-neutral-400 hover:text-gold flex items-center gap-1 transition"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2.5">
          Silhouette / Category
        </h4>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`w-full text-left px-2.5 py-1.5 rounded transition flex items-center justify-between ${
              selectedCategory === 'All'
                ? 'bg-atelier-800 text-gold font-medium border-l-2 border-gold'
                : 'text-neutral-300 hover:bg-atelier-800/40 hover:text-white'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id || cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`w-full text-left px-2.5 py-1.5 rounded transition flex items-center justify-between ${
                selectedCategory === cat.name
                  ? 'bg-atelier-800 text-gold font-medium border-l-2 border-gold'
                  : 'text-neutral-300 hover:bg-atelier-800/40 hover:text-white'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="pt-2 border-t border-atelier-800/80">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
            Price Ceiling
          </h4>
          <span className="text-xs font-mono font-semibold text-neutral-200">
            {formatPrice(priceRange)}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="2000"
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-gold bg-atelier-800 h-1.5 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
          <span>{formatPrice(500)}</span>
          <span>{formatPrice(2000)}</span>
        </div>
      </div>

      {/* Size Selector Pills */}
      <div className="pt-2 border-t border-atelier-800/80">
        <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2.5">
          Available Sizes
        </h4>
        <div className="grid grid-cols-5 gap-1.5">
          {allSizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-1.5 rounded text-xs font-mono font-medium transition border ${
                  isSelected
                    ? 'bg-gold text-atelier-950 border-gold font-bold shadow-sm'
                    : 'bg-atelier-950 text-neutral-400 border-atelier-800 hover:border-neutral-600 hover:text-neutral-200'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Material Selector */}
      <div className="pt-2 border-t border-atelier-800/80">
        <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2.5">
          Material & Leather
        </h4>
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          className="w-full bg-atelier-950 border border-atelier-800 rounded p-2 text-xs text-neutral-200 focus:outline-none focus:border-gold"
        >
          {materials.map((m) => (
            <option key={m.value} value={m.value} className="bg-atelier-900 text-neutral-200">
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* In-Stock Status Toggle */}
      <div className="pt-2 border-t border-atelier-800/80">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs uppercase tracking-widest text-neutral-300 group-hover:text-white transition">
            In-Stock Pieces Only
          </span>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-atelier-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gold"></div>
          </div>
        </label>
      </div>
    </aside>
  );
}
