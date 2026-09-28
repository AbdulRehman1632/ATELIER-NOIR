import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ShieldCheck,
  Globe,
  MessageCircle,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency, currencies } = useCurrency();
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'ARCHIVE', path: '/shop' },
    { name: 'BIKER', path: '/shop?category=Biker%20Jackets' },
    { name: 'BOMBERS', path: '/shop?category=Bomber%20Jackets' },
    { name: 'TRENCH', path: '/shop?category=Trench%20Coats' },
    { name: 'BLOUSONS', path: '/shop?category=Leather%20Blousons' },
    { name: 'SHEARLING', path: '/shop?category=Shearling%20Aviators' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-atelier-950 border-b border-atelier-800 text-[11px] tracking-widest text-gold-300 py-1.5 px-4 text-center flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-4 text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            ATELIER BESPOKE CONCIERGE ACTIVE
          </span>
        </div>
        <div className="mx-auto flex items-center gap-2">
          <span>COMPLIMENTARY WORLDWIDE WHITE-GLOVE DELIVERY OVER $500</span>
          <span className="hidden sm:inline text-atelier-600">•</span>
          <span className="hidden sm:inline text-neutral-400">HANDCRAFTED IN ITALY & UK</span>
        </div>
        <div className="hidden md:flex items-center space-x-3 text-neutral-300">
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 hover:text-gold transition text-[11px]"
            >
              <Globe className="w-3 h-3" />
              <span>{currencies[currency]?.label}</span>
              <ChevronDown className="w-2.5 h-2.5" />
            </button>
            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1 py-1 w-24 bg-atelier-900 border border-atelier-700 rounded shadow-xl z-50">
                {Object.keys(currencies).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-1 text-[11px] hover:bg-atelier-800 hover:text-gold ${
                      currency === curr ? 'text-gold font-semibold' : 'text-neutral-300'
                    }`}
                  >
                    {currencies[curr].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav className="glass-panel border-b border-atelier-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Mobile Toggle & Desktop Nav Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-neutral-300 hover:text-gold p-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <ul className="hidden lg:flex items-center space-x-7 text-[12px] tracking-widest font-medium text-neutral-300">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-gold transition-colors duration-200 uppercase relative group py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Brand Logo */}
        <div className="text-center absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="inline-block group">
            <span className="block font-serif text-xl sm:text-2xl tracking-[0.28em] font-bold text-neutral-100 group-hover:text-gold transition-colors">
              ATELIER NOIR
            </span>
            <span className="block text-[8px] sm:text-[9px] tracking-[0.45em] text-gold-400 uppercase font-light -mt-0.5">
              HAUTE MAROQUINERIE
            </span>
          </Link>
        </div>

        {/* Right: Actions (Search, Wishlist, Cart, Admin) */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-neutral-300 hover:text-gold transition p-1.5"
            aria-label="Search Collection"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="text-neutral-300 hover:text-gold transition p-1.5 relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-atelier-950 font-bold text-[10px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Shopping Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-neutral-300 hover:text-gold transition p-1.5 relative"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-atelier-950 font-bold text-[10px] flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Direct Access */}
          <Link
            to="/admin"
            className={`p-1.5 rounded transition flex items-center gap-1 text-[11px] font-medium tracking-wider ${
              isAuthenticated
                ? 'text-gold hover:text-gold-200 border border-gold/40 px-2'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Admin Portal"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">{isAuthenticated ? 'PORTAL' : 'ADMIN'}</span>
          </Link>
        </div>
      </nav>

      {/* Expandable Search Overlay */}
      {isSearchOpen && (
        <div className="bg-atelier-900/95 border-b border-atelier-800 p-4 transition-all duration-300 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-gold-400" />
            <input
              type="text"
              placeholder="Search jackets by style, silhouette, leather, or SKU (e.g. Biker, Shearling, Gabardine)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-atelier-700 text-sm text-neutral-100 placeholder-neutral-500 py-2 focus:outline-none focus:border-gold"
              autoFocus
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-400 text-atelier-950 text-xs font-semibold px-4 py-2 uppercase tracking-widest rounded"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-neutral-400 hover:text-neutral-200 text-xs px-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[88px] bg-atelier-950/98 backdrop-blur-xl border-b border-atelier-800 p-6 shadow-2xl z-50">
          <div className="flex flex-col space-y-4 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase font-serif text-neutral-200 hover:text-gold py-2 border-b border-atelier-900"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex justify-center items-center gap-4 text-xs text-neutral-400">
              <span>Currency:</span>
              {Object.keys(currencies).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-1 rounded text-xs ${
                    currency === curr ? 'bg-gold text-atelier-950 font-bold' : 'bg-atelier-800'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-gold-400 uppercase tracking-widest pt-2 flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Management Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
