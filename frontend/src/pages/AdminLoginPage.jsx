import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@ateliernoir.com');
    setPassword('Admin@12345');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-atelier-950 border border-atelier-800 rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-atelier-900 border border-gold/40 flex items-center justify-center text-gold mx-auto shadow-luxury-gold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-widest text-neutral-100 uppercase">
            ATELIER NOIR
          </h2>
          <p className="text-xs text-gold-400 tracking-[0.25em] uppercase font-light">
            Master Artisan & Executive Portal
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-lg flex items-center gap-2 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-neutral-400 uppercase tracking-wider font-medium">Administrator Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ateliernoir.com"
                className="w-full bg-atelier-900 border border-atelier-800 rounded-lg pl-9 pr-3 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-neutral-400 uppercase tracking-wider font-medium">Secret Keyphrase / Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-atelier-900 border border-atelier-800 rounded-lg pl-9 pr-3 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gold hover:bg-gold-400 disabled:opacity-50 text-atelier-950 font-bold tracking-widest uppercase rounded-lg shadow-luxury-gold transition duration-200 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In To Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Quick Button */}
        <div className="pt-2 border-t border-atelier-800/80 text-center space-y-2">
          <p className="text-[11px] text-neutral-400">Testing credentials provided for evaluation:</p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="w-full py-2 px-3 bg-atelier-900 hover:bg-atelier-850 border border-atelier-700 rounded text-gold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Auto-fill Admin Credentials (admin@ateliernoir.com)</span>
          </button>
        </div>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-neutral-500 hover:text-neutral-300 transition">
            ← Return to Public Atelier Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
