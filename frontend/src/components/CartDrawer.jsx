import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { buildWhatsAppCartOrderMessage, openWhatsAppChat } from '../utils/whatsapp';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, cartTotal } = useCart();
  const { formatPrice } = useCurrency();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const message = buildWhatsAppCartOrderMessage({
      cartItems: cart,
      totalAmount: cartTotal
    });

    openWhatsAppChat({
      message,
      orderData: {
        customerName: 'Client (Cart Checkout)',
        items: cart.map(i => ({
          product: i.id,
          title: i.title,
          sku: i.sku,
          color: i.color?.name || 'Standard',
          size: i.size,
          quantity: i.quantity,
          price: i.price,
          image: i.image
        })),
        totalAmount: cartTotal,
        orderType: 'WhatsApp Direct'
      }
    });
  };

  const freeShippingThreshold = 500;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-atelier-950 border-l border-atelier-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-atelier-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="font-serif text-lg tracking-widest text-neutral-100 uppercase">
                YOUR ATELIER BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-neutral-400 hover:text-neutral-100 p-1 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="bg-atelier-900/60 px-6 py-2.5 border-b border-atelier-800 text-xs">
            <div className="flex justify-between text-neutral-300 mb-1">
              <span>White-Glove Delivery</span>
              <span className="text-gold font-medium">
                {cartTotal >= freeShippingThreshold
                  ? 'Unlocked'
                  : `$${freeShippingThreshold - cartTotal} to complimentary`}
              </span>
            </div>
            <div className="w-full bg-atelier-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gold h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-atelier-700 mx-auto stroke-[1.2]" />
                <p className="text-neutral-400 font-serif text-base">Your shopping bag is empty.</p>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our handcrafted collection of premium leather bikers, shearling bombers, and tailored outerwear.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-gold text-atelier-950 text-xs font-semibold uppercase tracking-widest rounded hover:bg-gold-400 transition"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.id}-${item.size}-${item.color?.name}-${idx}`}
                  className="flex gap-4 p-3 bg-atelier-900/50 border border-atelier-800 rounded relative group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-24 object-cover object-center rounded bg-atelier-950 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-medium text-neutral-100 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color?.name)}
                          className="text-neutral-500 hover:text-rose-400 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Size: <span className="text-neutral-200 font-medium">{item.size}</span>
                        {item.color?.name && (
                          <span className="ml-2 inline-flex items-center gap-1">
                            • <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color.hex }} />
                            {item.color.name}
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{item.sku}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-atelier-800">
                      <div className="flex items-center border border-atelier-700 rounded bg-atelier-950 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color?.name, item.quantity - 1)}
                          className="px-2 py-0.5 text-neutral-400 hover:text-neutral-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-medium text-neutral-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color?.name, item.quantity + 1)}
                          className="px-2 py-0.5 text-neutral-400 hover:text-neutral-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-serif text-sm font-semibold text-gold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order CTAs */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-atelier-800 bg-atelier-900/90 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-400 tracking-wider uppercase text-xs">Estimated Total:</span>
                <span className="font-serif text-xl font-bold text-neutral-100">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              {/* Direct WhatsApp Ordering Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition duration-200 shadow-lg hover:shadow-emerald-900/40"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Order Entire Bag via WhatsApp</span>
              </button>

              {/* Atelier White Glove Checkout */}
              <button
                onClick={() => {
                  alert('Thank you for reserving with Atelier Noir. Our concierge has registered your selection and will connect via WhatsApp/Email to coordinate sizing measurements and insured dispatch.');
                  handleWhatsAppCheckout();
                }}
                className="w-full py-3 px-4 bg-gold hover:bg-gold-400 text-atelier-950 font-semibold rounded text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition"
              >
                <span>White-Glove Concierge Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>100% Guaranteed Authenticity • Lifetime Craftsmanship Warranty</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
