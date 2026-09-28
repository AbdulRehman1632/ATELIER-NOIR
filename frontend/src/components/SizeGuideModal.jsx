import React, { useState } from 'react';
import { X, Ruler, MessageCircle, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function SizeGuideModal({ isOpen, onClose, productTitle = 'Jacket' }) {
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'

  if (!isOpen) return null;

  const measurements = {
    in: [
      { size: 'S', chest: '36 - 38', shoulder: '17.5', sleeve: '25.0', length: '25.5', recommendedWeight: '130 - 150 lbs' },
      { size: 'M', chest: '39 - 41', shoulder: '18.2', sleeve: '25.5', length: '26.0', recommendedWeight: '150 - 170 lbs' },
      { size: 'L', chest: '42 - 44', shoulder: '19.0', sleeve: '26.0', length: '26.5', recommendedWeight: '170 - 195 lbs' },
      { size: 'XL', chest: '45 - 47', shoulder: '19.8', sleeve: '26.5', length: '27.0', recommendedWeight: '195 - 220 lbs' },
      { size: 'XXL', chest: '48 - 50', shoulder: '20.5', sleeve: '27.0', length: '27.5', recommendedWeight: '220 - 245 lbs' }
    ],
    cm: [
      { size: 'S', chest: '91 - 96', shoulder: '44.5', sleeve: '63.5', length: '64.8', recommendedWeight: '59 - 68 kg' },
      { size: 'M', chest: '99 - 104', shoulder: '46.2', sleeve: '64.8', length: '66.0', recommendedWeight: '68 - 77 kg' },
      { size: 'L', chest: '107 - 112', shoulder: '48.3', sleeve: '66.0', length: '67.3', recommendedWeight: '77 - 88 kg' },
      { size: 'XL', chest: '114 - 119', shoulder: '50.3', sleeve: '67.3', length: '68.6', recommendedWeight: '88 - 100 kg' },
      { size: 'XXL', chest: '122 - 127', shoulder: '52.0', sleeve: '68.6', length: '69.8', recommendedWeight: '100 - 111 kg' }
    ]
  };

  const handleAskConcierge = () => {
    const text = `Hello Atelier Concierge, I am reviewing the size guide for "${productTitle}". Could you please advise me on the ideal fit based on my measurements?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-atelier-950 border border-atelier-800 rounded-xl shadow-2xl p-6 sm:p-8 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-atelier-800">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg tracking-wider text-neutral-100 uppercase">
              ATELIER SIZE & FIT ARCHIVE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-100 p-1 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-between items-center my-4">
          <p className="text-xs text-neutral-400">
            All jackets are tailored with an anatomical European cut.
          </p>
          <div className="flex items-center bg-atelier-900 border border-atelier-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded transition ${
                unit === 'in' ? 'bg-gold text-atelier-950 font-bold' : 'text-neutral-400'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded transition ${
                unit === 'cm' ? 'bg-gold text-atelier-950 font-bold' : 'text-neutral-400'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-atelier-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-atelier-900 text-gold-300 uppercase tracking-widest font-mono border-b border-atelier-800">
              <tr>
                <th className="p-3">Size</th>
                <th className="p-3">Chest</th>
                <th className="p-3">Shoulder</th>
                <th className="p-3">Sleeve</th>
                <th className="p-3">Back Length</th>
                <th className="p-3">Typical Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-atelier-800/60 font-light text-neutral-300">
              {measurements[unit].map((row) => (
                <tr key={row.size} className="hover:bg-atelier-900/40 transition">
                  <td className="p-3 font-semibold text-neutral-100 font-mono">{row.size}</td>
                  <td className="p-3">{row.chest} {unit}</td>
                  <td className="p-3">{row.shoulder} {unit}</td>
                  <td className="p-3">{row.sleeve} {unit}</td>
                  <td className="p-3">{row.length} {unit}</td>
                  <td className="p-3 text-neutral-400">{row.recommendedWeight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement Tips */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-neutral-400">
          <div className="flex items-start gap-2 bg-atelier-900/40 p-2.5 rounded border border-atelier-800/60">
            <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <span><strong>Between sizes?</strong> If you intend to layer thick cashmere knits or hoodies, we recommend sizing up one grade.</span>
          </div>
          <div className="flex items-start gap-2 bg-atelier-900/40 p-2.5 rounded border border-atelier-800/60">
            <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
            <span><strong>Natural mold:</strong> Full-grain calfskin and lambskin stretch naturally 0.5–1 inch around high-tension points.</span>
          </div>
        </div>

        {/* Concierge CTA in modal */}
        <div className="mt-6 pt-4 border-t border-atelier-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-neutral-400 text-center sm:text-left">
            Need bespoke sleeve shortening or personalized tailoring advice?
          </span>
          <button
            onClick={handleAskConcierge}
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consult Sizing on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
