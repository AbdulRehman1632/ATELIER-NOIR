import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Eye, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { buildWhatsAppOrderMessage, openWhatsAppChat } from '../utils/whatsapp';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  // Selected color variant state: default to first color variant or null
  const [selectedColor, setSelectedColor] = useState(
    product.colorVariants && product.colorVariants.length > 0
      ? product.colorVariants[0]
      : null
  );

  // Active display image: dynamically updates when color swatch is clicked!
  const currentImage = selectedColor?.image || product.images?.[0] || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80';

  const isFavorited = isInWishlist(product._id);
  const isOutOfStock = !product.inStock || product.stockQuantity <= 0;

  const handleWhatsAppDirectBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedSize = product.availableSizes?.[0] || 'M';
    const message = buildWhatsAppOrderMessage({
      product,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      price: product.discountedPrice || product.basePrice,
      currentUrl: `${window.location.origin}/product/${product.slug}`
    });

    openWhatsAppChat({
      message,
      orderData: {
        customerName: 'Direct Client via Catalog',
        items: [
          {
            product: product._id,
            title: product.title,
            slug: product.slug,
            sku: product.sku,
            color: selectedColor?.name || 'Signature',
            size: selectedSize,
            quantity: 1,
            price: product.discountedPrice || product.basePrice,
            image: currentImage
          }
        ],
        totalAmount: product.discountedPrice || product.basePrice
      }
    });
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const size = product.availableSizes?.[0] || 'M';
    addToCart(product, selectedColor, size, 1);
  };

  return (
    <div className="group relative bg-atelier-900 border border-atelier-800 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:border-gold/50 hover:shadow-luxury">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-atelier-950">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={currentImage}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {isOutOfStock ? (
            <span className="bg-rose-950/90 text-rose-300 text-[10px] tracking-widest font-semibold px-2 py-0.5 uppercase border border-rose-800">
              Archived / Sold Out
            </span>
          ) : product.discountedPrice ? (
            <span className="bg-gold-500/95 text-atelier-950 text-[10px] tracking-widest font-bold px-2 py-0.5 uppercase">
              Privileged Offer
            </span>
          ) : product.isNewArrival ? (
            <span className="bg-atelier-800/90 text-gold-300 text-[10px] tracking-widest font-semibold px-2 py-0.5 uppercase border border-gold/30">
              New Arrival
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-atelier-900/80 backdrop-blur-sm text-neutral-300 hover:text-rose-400 hover:bg-atelier-850 transition z-10"
          aria-label="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition ${
              isFavorited ? 'fill-rose-500 text-rose-500' : ''
            }`}
          />
        </button>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-atelier-950/95 via-atelier-950/60 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-between gap-2 z-10">
          <button
            onClick={handleWhatsAppDirectBuy}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold py-2 px-3 rounded flex items-center justify-center gap-1.5 transition shadow-lg"
            title="Order directly with concierge on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order via WhatsApp</span>
          </button>
          
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className="p-2 bg-atelier-800 hover:bg-gold hover:text-atelier-950 text-neutral-200 rounded transition disabled:opacity-40 disabled:cursor-not-allowed"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-atelier-900">
        <div>
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 tracking-wider uppercase mb-1">
            <span>{product.category}</span>
            <span className="text-neutral-500 text-[10px]">{product.sku}</span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-[15px] font-medium text-neutral-100 group-hover:text-gold transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {/* Material & Fit */}
          <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1 font-light">
            {product.material}
          </p>
        </div>

        <div className="pt-3 border-t border-atelier-800/80 mt-3 flex items-center justify-between">
          {/* Interactive Color Swatches */}
          <div className="flex items-center space-x-1.5">
            {product.colorVariants && product.colorVariants.length > 0 ? (
              product.colorVariants.map((color) => {
                const isSelected = selectedColor?.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedColor(color);
                    }}
                    title={color.name}
                    className={`w-3.5 h-3.5 rounded-full border transition-all transform ${
                      isSelected
                        ? 'ring-2 ring-gold ring-offset-1 ring-offset-atelier-900 scale-110'
                        : 'border-atelier-700 hover:scale-110 opacity-75 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })
            ) : (
              <span className="w-3 h-3 rounded-full bg-neutral-600" />
            )}
          </div>

          {/* Price display */}
          <div className="text-right">
            {product.discountedPrice ? (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-neutral-500 line-through">
                  {formatPrice(product.basePrice)}
                </span>
                <span className="text-sm font-semibold text-gold font-serif">
                  {formatPrice(product.discountedPrice)}
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold text-neutral-200 font-serif">
                {formatPrice(product.basePrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
