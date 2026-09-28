import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, MessageCircle, Mail, ArrowRight, Heart } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-atelier-950 border-t border-atelier-800 text-neutral-300">
      {/* Brand Value Pillars */}
      <div className="border-b border-atelier-800/80 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-atelier-900 border border-atelier-700 flex items-center justify-center text-gold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-neutral-100 font-semibold">
              Mastercrafted Heritage
            </h4>
            <p className="text-xs text-neutral-400 font-light">
              Individually cut and tailored using top-grade Italian and Spanish hides, hand-waxed for lifetime patina.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-atelier-900 border border-atelier-700 flex items-center justify-center text-gold">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-neutral-100 font-semibold">
              White-Glove Delivery
            </h4>
            <p className="text-xs text-neutral-400 font-light">
              Complimentary fully insured worldwide courier. Every garment arrives in a breathable cedar garment case.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-atelier-900 border border-atelier-700 flex items-center justify-center text-gold">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-neutral-100 font-semibold">
              Lifetime Care & Restoration
            </h4>
            <p className="text-xs text-neutral-400 font-light">
              Complimentary annual leather conditioning and hardware servicing for all registered Atelier owners.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-atelier-900 border border-atelier-700 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-sm tracking-wider uppercase text-neutral-100 font-semibold">
              Personal Concierge
            </h4>
            <p className="text-xs text-neutral-400 font-light">
              Direct access to our master tailors via WhatsApp for bespoke commissions, measurements, and styling advice.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand Story */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="inline-block">
            <span className="font-serif text-2xl tracking-[0.25em] font-bold text-neutral-100">
              ATELIER NOIR
            </span>
            <span className="block text-[9px] tracking-[0.4em] text-gold-400 uppercase font-light">
              HAUTE MAROQUINERIE
            </span>
          </Link>
          <p className="text-xs text-neutral-400 leading-relaxed font-light max-w-sm">
            Architecting modern silhouettes with timeless craftsmanship. We refuse mass assembly, crafting each leather jacket in limited batches with hand-burnished edges and bespoke palladium fittings.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs hover:bg-emerald-900/60 transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge: +1 (555) 019-2834</span>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h5 className="font-serif text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4">
            ARCHIVE
          </h5>
          <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
            <li>
              <Link to="/shop?category=Biker%20Jackets" className="hover:text-gold transition">
                Biker Jackets
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Bomber%20Jackets" className="hover:text-gold transition">
                Bomber Jackets
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Trench%20Coats" className="hover:text-gold transition">
                Trench Coats
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Leather%20Blousons" className="hover:text-gold transition">
                Leather Blousons
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Shearling%20Aviators" className="hover:text-gold transition">
                Shearling Aviators
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Services */}
        <div>
          <h5 className="font-serif text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4">
            ATELIER SERVICES
          </h5>
          <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
            <li>
              <Link to="/shop" className="hover:text-gold transition">
                Private Vault Collection
              </Link>
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello,%20I%20am%20interested%20in%20a%20bespoke%20jacket.`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition"
              >
                Bespoke Tailoring Request
              </a>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-gold transition">
                Saved Wishlist
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-gold transition">
                Atelier Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h5 className="font-serif text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4">
            PRIVATE DISPATCH
          </h5>
          <p className="text-xs text-neutral-400 font-light mb-3">
            Receive private allocations for seasonal small-batch drops.
          </p>
          {subscribed ? (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded text-xs text-emerald-300">
              Welcome to the Atelier Noir private register.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-atelier-900 border border-atelier-800 rounded px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-gold hover:bg-gold-400 text-atelier-950 rounded flex items-center justify-center transition"
                  aria-label="Submit email"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-atelier-800 py-6 px-4 sm:px-8 text-[11px] text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <div>
          © {new Date().getFullYear()} ATELIER NOIR LLC. All rights reserved. Mastercrafted in Florence & London.
        </div>
        <div className="flex items-center space-x-6">
          <span className="hover:text-neutral-400 transition cursor-pointer">Privacy Policy</span>
          <span className="hover:text-neutral-400 transition cursor-pointer">Terms of Service</span>
          <span className="hover:text-neutral-400 transition cursor-pointer">White Glove Shipping</span>
        </div>
      </div>
    </footer>
  );
}
