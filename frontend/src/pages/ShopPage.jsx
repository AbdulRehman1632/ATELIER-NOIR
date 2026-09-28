import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, X, Search, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { apiFetch } from '../utils/api';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter states
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState('newest');

  // Keep state synced with URL params
  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category'));
    } else {
      setSelectedCategory('All');
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search'));
    }
  }, [searchParams]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const catRes = await apiFetch('/categories');
        setCategories(catRes.data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCats();
  }, []);

  // Fetch filtered products
  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const queryParts = [];
        if (selectedCategory && selectedCategory !== 'All') {
          queryParts.push(`category=${encodeURIComponent(selectedCategory)}`);
        }
        if (searchQuery.trim()) {
          queryParts.push(`search=${encodeURIComponent(searchQuery.trim())}`);
        }
        if (priceRange < 2000) {
          queryParts.push(`maxPrice=${priceRange}`);
        }
        if (selectedSizes.length > 0) {
          queryParts.push(`size=${selectedSizes.join(',')}`);
        }
        if (selectedMaterial) {
          queryParts.push(`material=${encodeURIComponent(selectedMaterial)}`);
        }
        if (inStockOnly) {
          queryParts.push('inStock=true');
        }
        if (sortOption) {
          queryParts.push(`sort=${sortOption}`);
        }

        const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
        const res = await apiFetch(`/products${queryString}`);
        setProducts(res.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
  }, [selectedCategory, searchQuery, priceRange, selectedSizes, selectedMaterial, inStockOnly, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange(2000);
    setSelectedSizes([]);
    setSelectedMaterial('');
    setInStockOnly(false);
    setSortOption('newest');
    setSearchParams({});
  };

  const removeSizeTag = (size) => {
    setSelectedSizes(selectedSizes.filter((s) => s !== size));
  };

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (priceRange < 2000 ? 1 : 0) +
    selectedSizes.length +
    (selectedMaterial ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Top Banner & Title */}
      <div className="border-b border-atelier-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] tracking-widest text-gold-400 uppercase font-semibold">
            PERMANENT ARCHIVE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-wide mt-1">
            Mastercrafted Jackets
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-light">
            Displaying {products.length} bespoke pieces handcrafted across Italy, Spain, and Great Britain.
          </p>
        </div>

        {/* Sort Controls & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 bg-atelier-900 border border-atelier-800 text-neutral-200 text-xs tracking-wider uppercase rounded flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold" />
            <span>Refine Filters ({activeFilterCount})</span>
          </button>

          <div className="flex items-center bg-atelier-900 border border-atelier-800 rounded px-3 py-1.5 text-xs text-neutral-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-gold mr-2" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent text-neutral-200 focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-atelier-900">Newest Additions</option>
              <option value="price-low" className="bg-atelier-900">Price: Low to High</option>
              <option value="price-high" className="bg-atelier-900">Price: High to Low</option>
              <option value="rating" className="bg-atelier-900">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-neutral-500 uppercase tracking-widest text-[10px]">Active Filters:</span>
          {selectedCategory !== 'All' && (
            <span className="px-2.5 py-1 bg-atelier-800 text-gold border border-atelier-700 rounded-full flex items-center gap-1.5">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3 hover:text-white" /></button>
            </span>
          )}
          {searchQuery && (
            <span className="px-2.5 py-1 bg-atelier-800 text-gold border border-atelier-700 rounded-full flex items-center gap-1.5">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 hover:text-white" /></button>
            </span>
          )}
          {priceRange < 2000 && (
            <span className="px-2.5 py-1 bg-atelier-800 text-gold border border-atelier-700 rounded-full flex items-center gap-1.5">
              Under ${priceRange}
              <button onClick={() => setPriceRange(2000)}><X className="w-3 h-3 hover:text-white" /></button>
            </span>
          )}
          {selectedSizes.map((s) => (
            <span key={s} className="px-2.5 py-1 bg-atelier-800 text-gold border border-atelier-700 rounded-full flex items-center gap-1.5">
              Size: {s}
              <button onClick={() => removeSizeTag(s)}><X className="w-3 h-3 hover:text-white" /></button>
            </span>
          ))}
          {selectedMaterial && (
            <span className="px-2.5 py-1 bg-atelier-800 text-gold border border-atelier-700 rounded-full flex items-center gap-1.5">
              Material: {selectedMaterial}
              <button onClick={() => setSelectedMaterial('')}><X className="w-3 h-3 hover:text-white" /></button>
            </span>
          )}
          {inStockOnly && (
            <span className="px-2.5 py-1 bg-atelier-800 text-gold border border-atelier-700 rounded-full flex items-center gap-1.5">
              In-Stock Only
              <button onClick={() => setInStockOnly(false)}><X className="w-3 h-3 hover:text-white" /></button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-[11px] text-neutral-400 hover:text-rose-400 underline ml-2 transition"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[3/4] bg-atelier-900 border border-atelier-800 rounded animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-atelier-900/30 border border-atelier-800 rounded-lg p-8 space-y-4">
              <Sparkles className="w-10 h-10 text-gold mx-auto" />
              <h3 className="font-serif text-lg text-neutral-200">No Atelier Jackets Match Your Selected Criteria</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Try loosening your price or size filters, or consult directly with our tailoring concierge on WhatsApp for a custom bespoke piece.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-gold text-atelier-950 font-semibold text-xs tracking-widest uppercase rounded hover:bg-gold-400 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-atelier-950 p-6 overflow-y-auto border-l border-atelier-800 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-atelier-800 mb-6">
                  <h3 className="font-serif text-base tracking-widest text-neutral-100 uppercase">
                    Refine Archive
                  </h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="text-neutral-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedSizes={selectedSizes}
                  setSelectedSizes={setSelectedSizes}
                  selectedMaterial={selectedMaterial}
                  setSelectedMaterial={setSelectedMaterial}
                  inStockOnly={inStockOnly}
                  setInStockOnly={setInStockOnly}
                  onResetFilters={handleResetFilters}
                />
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-6 py-3 bg-gold text-atelier-950 font-semibold text-xs tracking-widest uppercase rounded"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
