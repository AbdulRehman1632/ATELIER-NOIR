import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Compass, Award, MessageCircle, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { apiFetch } from '../utils/api';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          apiFetch('/products?featured=true'),
          apiFetch('/categories')
        ]);
        setFeaturedProducts(prodData.data || []);
        setCategories(catData.data || []);
      } catch (err) {
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=2000&q=85"
            alt="Atelier Noir Leather Jacket"
            className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105 transform animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-atelier-950 via-atelier-950/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/40 bg-atelier-900/70 backdrop-blur-md text-gold-300 text-[11px] tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Autumn/Winter Haute Outerwear Archive</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.08em] text-neutral-100 leading-tight">
            ENGINEERED ELEGANCE. <br />
            <span className="gold-gradient-text font-serif italic">Mastered in Leather.</span>
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Handcrafted European calfskin bikers, Spanish merino shearling bombers, and bespoke gabardine trench coats engineered for permanence.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-400 text-atelier-950 font-semibold text-xs tracking-widest uppercase rounded shadow-luxury-gold transition duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Explore The Archive</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Atelier%20Noir,%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20jacket%20consultation.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-7 py-4 glass-panel hover:bg-atelier-800 text-neutral-200 hover:text-white border border-atelier-700 font-medium text-xs tracking-widest uppercase rounded transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Bespoke Concierge</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-neutral-500 text-[10px] tracking-[0.3em] uppercase flex flex-col items-center gap-2">
          <span>Scroll to Discover</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-atelier-800 pb-4">
          <div>
            <span className="text-[11px] tracking-widest text-gold-400 uppercase font-semibold">
              SIGNATURE SILHOUETTES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-100 tracking-wide mt-1">
              Curated Jacket Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs text-gold hover:text-gold-300 tracking-widest uppercase flex items-center gap-1 group font-medium"
          >
            <span>View All Styles</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id || cat.slug}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative aspect-[3/4] overflow-hidden rounded bg-atelier-900 border border-atelier-800 hover:border-gold/50 transition duration-300 flex flex-col justify-end p-4"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.6] group-hover:scale-110 group-hover:brightness-[0.75] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-atelier-950 via-atelier-950/20 to-transparent" />
              <div className="relative z-10">
                <h3 className="font-serif text-sm font-semibold text-neutral-100 group-hover:text-gold transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
                  {cat.itemCount || 'Archive'} Styles
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Masterpieces Carousel/Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] tracking-widest text-gold-400 uppercase font-semibold">
            THE PRIVILEGED SELECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-wide">
            Mastercrafted Featured Jackets
          </h2>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Each jacket is individually produced in numbered limited editions. Featuring interactive color selection and direct WhatsApp order reservation.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-[3/4] bg-atelier-900 animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center pt-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-atelier-900 hover:bg-atelier-850 border border-gold/40 text-gold-300 text-xs font-semibold uppercase tracking-widest rounded transition"
          >
            <span>Browse Full Jacket Archive ({featuredProducts.length + 4}+ Pieces)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Atelier Craftsmanship & Heritage Pillars */}
      <section className="bg-atelier-900/40 border-y border-atelier-800 py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[11px] tracking-widest text-gold-400 uppercase font-semibold">
              UNCOMPROMISED ARTISANSHIP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 leading-tight">
              The Alchemy of Full-Grain Leather & British Bespoke Tailoring
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              Unlike commercial fashion houses that shave and correct leather imperfections, Atelier Noir insists on 1.2mm uncorrected full-grain hides. Sourced exclusively from Italian and Spanish tanneries certified for gold-rated environmental stewardship.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-atelier-950 border border-atelier-800 rounded">
                <Award className="w-5 h-5 text-gold mb-2" />
                <h4 className="font-serif text-sm font-semibold text-neutral-200">Solid Palladium Pulls</h4>
                <p className="text-xs text-neutral-400 mt-1 font-light">Custom forged in Birmingham with hand-burnished antique finish.</p>
              </div>
              <div className="p-4 bg-atelier-950 border border-atelier-800 rounded">
                <Compass className="w-5 h-5 text-gold mb-2" />
                <h4 className="font-serif text-sm font-semibold text-neutral-200">100% Japanese Cupro</h4>
                <p className="text-xs text-neutral-400 mt-1 font-light">Silk-like twill lining woven from cotton linter for frictionless comfort.</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-atelier-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80"
              alt="Atelier Leather Craftsmanship"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-atelier-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 glass-panel rounded text-xs text-neutral-300">
              <span className="text-gold font-medium">Workshop Note:</span> Every seam is double-needle stitched with bonded nylon thread tested to withstand 45 lbs of tensile pressure.
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Concierge Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-950 via-atelier-900 to-atelier-950 border border-emerald-700/40 p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-[10px] tracking-widest uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Concierge Desk
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-100">
              Need Sizing Guidance or Bespoke Leather Customization?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              Connect directly with our master tailors via WhatsApp. Receive personalized chest and sleeve fitting assessments or arrange private showroom fittings.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Concierge,%20I%20would%20like%20to%20ask%20about%20leather%20jacket%20sizing.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-xs tracking-widest uppercase flex items-center gap-2 shadow-lg transition"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Message Atelier Concierge</span>
              </a>
              <Link
                to="/shop"
                className="px-6 py-3 bg-atelier-900 hover:bg-atelier-800 text-neutral-200 rounded font-medium text-xs tracking-widest uppercase border border-atelier-700 transition"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
