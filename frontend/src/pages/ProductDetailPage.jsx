import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Share2,
  Ruler,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Star,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
  ZoomIn
} from 'lucide-react';
import { apiFetch } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { buildWhatsAppOrderMessage, openWhatsAppChat } from '../utils/whatsapp';
import SizeGuideModal from '../components/SizeGuideModal';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gallery state
  const [activeImage, setActiveImage] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Customization state
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState('materials');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch(`/products/${slug}`);
        const prod = res.data;
        setProduct(prod);

        // Set default color
        if (prod.colorVariants && prod.colorVariants.length > 0) {
          setSelectedColor(prod.colorVariants[0]);
          setActiveImage(prod.colorVariants[0].image || prod.images[0]);
        } else {
          setActiveImage(prod.images?.[0] || '');
        }

        // Set default size
        if (prod.availableSizes && prod.availableSizes.length > 0) {
          setSelectedSize(prod.availableSizes[0]);
        }

        // Fetch related jackets in same category
        if (prod.category) {
          const relRes = await apiFetch(`/products?category=${encodeURIComponent(prod.category)}`);
          setRelatedProducts(relRes.data.filter((p) => p._id !== prod._id).slice(0, 3));
        }
      } catch (err) {
        setError(err.message || 'Jacket not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-atelier-900 rounded-lg" />
          <div className="space-y-6">
            <div className="h-8 bg-atelier-900 rounded w-3/4" />
            <div className="h-6 bg-atelier-900 rounded w-1/3" />
            <div className="h-24 bg-atelier-900 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-4 space-y-4">
        <h2 className="font-serif text-2xl text-neutral-100">Piece Not Found</h2>
        <p className="text-xs text-neutral-400">The requested jacket archive record could not be retrieved.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 bg-gold text-atelier-950 font-semibold text-xs uppercase tracking-widest rounded"
        >
          Return to Archive
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product._id);
  const isOutOfStock = !product.inStock || product.stockQuantity <= 0;
  const currentPrice = product.discountedPrice || product.basePrice;

  // Handle color change: update selected color AND active preview image!
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (color.image) {
      setActiveImage(color.image);
    }
  };

  // Magnifier zoom handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  // WhatsApp Direct Order Action
  const handleWhatsAppOrder = () => {
    const message = buildWhatsAppOrderMessage({
      product,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: currentPrice,
      currentUrl: window.location.href
    });

    openWhatsAppChat({
      message,
      orderData: {
        customerName: 'Direct Client via PDP',
        items: [
          {
            product: product._id,
            title: product.title,
            slug: product.slug,
            sku: product.sku,
            color: selectedColor?.name || 'Signature Atelier',
            size: selectedSize,
            quantity,
            price: currentPrice,
            image: activeImage
          }
        ],
        totalAmount: currentPrice * quantity,
        orderType: 'WhatsApp Direct'
      }
    });
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Combine product gallery images and color images for thumbnails
  const allGalleryImages = Array.from(
    new Set([
      ...(product.images || []),
      ...(product.colorVariants?.map((c) => c.image) || [])
    ])
  ).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-16">
      {/* Breadcrumbs */}
      <nav className="text-xs text-neutral-400 flex items-center gap-2 tracking-wider">
        <Link to="/" className="hover:text-gold transition">HOME</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-gold transition">ARCHIVE</Link>
        <span>/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-gold transition uppercase">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-neutral-200 uppercase truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* Main Grid: Gallery & Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery (Thumbnails + Main Image with Zoom) - 7 cols */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
            {allGalleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-20 sm:w-20 sm:h-24 rounded border overflow-hidden flex-shrink-0 bg-atelier-950 transition-all ${
                  activeImage === img
                    ? 'border-gold ring-1 ring-gold shadow-luxury'
                    : 'border-atelier-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover object-center" />
              </button>
            ))}
          </div>

          {/* Main Display Image with Zoom preview */}
          <div
            className="relative flex-1 aspect-[3/4] bg-atelier-950 rounded-lg overflow-hidden border border-atelier-800 group cursor-crosshair"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={activeImage}
              alt={product.title}
              className={`w-full h-full object-cover object-center transition-all duration-300 ${
                isZoomed ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Magnified zoom layer */}
            {isZoomed && (
              <div
                className="absolute inset-0 bg-no-repeat pointer-events-none transition-all duration-75"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                  backgroundSize: '220%'
                }}
              />
            )}

            {/* Zoom helper badge */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-atelier-950/80 backdrop-blur-md text-[10px] text-neutral-300 flex items-center gap-1 opacity-70 group-hover:opacity-100 transition pointer-events-none">
              <ZoomIn className="w-3 h-3 text-gold" />
              <span>Hover to Magnify Detail</span>
            </div>

            {/* Out of Stock banner */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <span className="bg-rose-950 border border-rose-800 text-rose-300 text-xs tracking-widest uppercase font-semibold px-4 py-2">
                  Currently Sold Out / Archive Only
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Customization & Ordering Engine - 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Badges */}
          <div>
            <div className="flex items-center justify-between text-xs tracking-widest text-gold-400 uppercase font-mono mb-1.5">
              <span>{product.category}</span>
              <span className="text-neutral-500">{product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-100 tracking-wide leading-tight">
              {product.title}
            </h1>

            {/* Rating and review counter */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                ))}
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                {product.rating} ({product.reviewsCount} Client Reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-atelier-800">
            {product.discountedPrice ? (
              <>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gold">
                  {formatPrice(product.discountedPrice)}
                </span>
                <span className="text-sm text-neutral-500 line-through">
                  {formatPrice(product.basePrice)}
                </span>
                <span className="text-[10px] tracking-widest font-semibold px-2 py-0.5 uppercase bg-gold/10 text-gold border border-gold/30 rounded">
                  Private Allocation
                </span>
              </>
            ) : (
              <span className="font-serif text-2xl sm:text-3xl font-bold text-neutral-100">
                {formatPrice(product.basePrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Interactive Color Swatch Picker */}
          {product.colorVariants && product.colorVariants.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-widest text-neutral-400">
                  Color: <strong className="text-neutral-100 font-serif">{selectedColor?.name || 'Signature'}</strong>
                </span>
                <span className="text-[11px] text-gold font-mono">{selectedColor?.hex}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colorVariants.map((color) => {
                  const isSelected = selectedColor?.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => handleColorSelect(color)}
                      className={`relative flex items-center gap-2 p-1.5 rounded-lg border transition ${
                        isSelected
                          ? 'border-gold bg-atelier-900 shadow-luxury-gold'
                          : 'border-atelier-800 bg-atelier-950/60 hover:border-neutral-600'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/30 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs text-neutral-300 font-light pr-1 hidden sm:inline">
                        {color.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3 h-3 text-gold absolute -top-1 -right-1 bg-atelier-950 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector with Size Guide Modal Trigger */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-widest text-neutral-400">
                Selected Size: <strong className="text-neutral-100 font-mono">{selectedSize}</strong>
              </span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-gold hover:text-gold-300 flex items-center gap-1 transition text-xs uppercase tracking-wider"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Interactive Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.availableSizes?.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded text-xs font-mono font-medium transition border flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-gold text-atelier-950 border-gold font-bold shadow-luxury-gold'
                        : 'bg-atelier-900 text-neutral-300 border-atelier-800 hover:border-neutral-600 hover:text-white'
                    }`}
                  >
                    <span>{size}</span>
                  </button>
                );
              })}
            </div>

            {/* Inventory Status Note */}
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {product.stockQuantity > 5
                  ? 'Guaranteed immediate dispatch from European reserve'
                  : `Only ${product.stockQuantity} pieces remaining in current batch`}
              </span>
            </div>
          </div>

          {/* Quantity and Actions CTA */}
          <div className="space-y-3 pt-3">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-atelier-800 rounded bg-atelier-950 text-xs px-2 py-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-neutral-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 font-mono font-bold text-neutral-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity || 10, quantity + 1))}
                  className="px-2 text-neutral-400 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 py-3.5 px-6 bg-gold hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed text-atelier-950 font-bold text-xs tracking-widest uppercase rounded shadow-luxury-gold transition duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOutOfStock ? 'Archived / Sold Out' : 'Add to Atelier Bag'}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className="p-3.5 rounded bg-atelier-900 border border-atelier-800 text-neutral-300 hover:text-rose-400 transition"
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Direct WhatsApp Ordering CTA Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-widest uppercase rounded shadow-lg transition flex items-center justify-center gap-2.5 group"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>Direct Order via WhatsApp</span>
            </button>
            <p className="text-[10px] text-neutral-500 text-center">
              Pre-formats Title, SKU, Size, and Color directly with our Concierge Desk.
            </p>
          </div>

          {/* Expandable Luxury Accordions */}
          <div className="pt-4 border-t border-atelier-800 space-y-2 text-xs">
            {/* Craftsmanship & Materials */}
            <div className="border border-atelier-800/80 rounded bg-atelier-900/40 overflow-hidden">
              <button
                onClick={() => toggleAccordion('materials')}
                className="w-full p-3.5 text-left flex items-center justify-between text-neutral-200 uppercase tracking-widest font-serif"
              >
                <span>Craftsmanship & Materials</span>
                {openAccordion === 'materials' ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'materials' && (
                <div className="p-4 pt-0 text-neutral-400 space-y-2 font-light border-t border-atelier-800/40">
                  <p><strong>Primary Hide:</strong> {product.material}</p>
                  <p><strong>Silhouetted Fit:</strong> {product.fit}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {product.details?.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tailoring & Fit */}
            <div className="border border-atelier-800/80 rounded bg-atelier-900/40 overflow-hidden">
              <button
                onClick={() => toggleAccordion('tailoring')}
                className="w-full p-3.5 text-left flex items-center justify-between text-neutral-200 uppercase tracking-widest font-serif"
              >
                <span>Tailoring & Fit Guidelines</span>
                {openAccordion === 'tailoring' ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'tailoring' && (
                <div className="p-4 pt-0 text-neutral-400 space-y-2 font-light border-t border-atelier-800/40">
                  <p>This jacket is cut in our proprietary European tailoring block. Designed to contour cleanly through the torso without restricting arm movement.</p>
                  <p>For custom sleeve length modifications (+/- 1.5 inches), connect with our master tailor via WhatsApp prior to dispatch.</p>
                </div>
              )}
            </div>

            {/* Shipping & Delivery */}
            <div className="border border-atelier-800/80 rounded bg-atelier-900/40 overflow-hidden">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full p-3.5 text-left flex items-center justify-between text-neutral-200 uppercase tracking-widest font-serif"
              >
                <span>White-Glove Shipping & Returns</span>
                {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="p-4 pt-0 text-neutral-400 space-y-2 font-light border-t border-atelier-800/40">
                  <p>• Complimentary insured priority courier worldwide on all outerwear.</p>
                  <p>• Delivered in our bespoke structured cedarwood garment case with solid brass hanger.</p>
                  <p>• 14-day complimentary exchanges to guarantee your bespoke satisfaction.</p>
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div className="border border-atelier-800/80 rounded bg-atelier-900/40 overflow-hidden">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full p-3.5 text-left flex items-center justify-between text-neutral-200 uppercase tracking-widest font-serif"
              >
                <span>Lifetime Care & Maintenance</span>
                {openAccordion === 'care' ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'care' && (
                <div className="p-4 pt-0 text-neutral-400 space-y-2 font-light border-t border-atelier-800/40">
                  <p>{product.careInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Recommendation Carousel */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-atelier-800 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[11px] tracking-widest text-gold-400 uppercase font-semibold">
                CURATED COMPANIONS
              </span>
              <h3 className="font-serif text-2xl text-neutral-100 tracking-wide mt-1">
                You May Also Admire
              </h3>
            </div>
            <Link to="/shop" className="text-xs text-gold uppercase tracking-widest hover:underline">
              View All Archive
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Interactive Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        productTitle={product.title}
      />
    </div>
  );
}
