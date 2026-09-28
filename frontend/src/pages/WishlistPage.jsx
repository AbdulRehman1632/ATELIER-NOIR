import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="border-b border-atelier-800 pb-6">
        <span className="text-[11px] tracking-widest text-gold-400 uppercase font-semibold">
          SAVED SELECTIONS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-wide mt-1">
          Your Private Wishlist ({wishlist.length})
        </h1>
        <p className="text-xs text-neutral-400 mt-1 font-light">
          Pieces earmarked for your personal wardrobe. Save and consult with our concierge before allocations sell out.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-24 bg-atelier-900/30 border border-atelier-800 rounded-lg p-8 space-y-4 max-w-lg mx-auto">
          <Heart className="w-12 h-12 text-atelier-700 mx-auto stroke-[1.2]" />
          <h3 className="font-serif text-xl text-neutral-200">Your Wishlist is Empty</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Curate your bespoke wishlist as you explore our archive of handmade leather bikers, shearling bombers, and tailored outerwear.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-atelier-950 font-semibold text-xs tracking-widest uppercase rounded hover:bg-gold-400 transition"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
