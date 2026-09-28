import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Ruler, Clock, Scissors, ShieldAlert } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const prompts = [
    {
      icon: Ruler,
      title: 'Ask about sizing & fit recommendations',
      text: 'Hello Atelier Concierge, I need assistance choosing the right jacket size for my chest and height measurements.'
    },
    {
      icon: Scissors,
      title: 'Custom bespoke leather inquiry',
      text: 'Hello, I am interested in inquiring about a custom bespoke leather jacket with personalized linings and hardware.'
    },
    {
      icon: Clock,
      title: 'Track an existing order status',
      text: 'Hello Atelier Concierge, I would like an update on the tailoring and dispatch status of my jacket order.'
    },
    {
      icon: Sparkles,
      title: 'Speak with Master Tailor',
      text: 'Hello, I would like to consult with an Atelier master tailor regarding leather care and patina longevity.'
    }
  ];

  const handleSend = (textToSend) => {
    const finalMsg = textToSend || customMsg;
    if (!finalMsg.trim()) return;

    const encoded = encodeURIComponent(finalMsg);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-emerald-400/30"
          aria-label="Open Atelier WhatsApp Concierge"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold tracking-wide">Atelier Concierge</div>
            <div className="text-[10px] text-emerald-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
              Direct WhatsApp Support
            </div>
          </div>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="w-[360px] max-w-[calc(100vw-32px)] bg-atelier-950 border border-atelier-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-4 text-white flex items-center justify-between border-b border-emerald-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-900 border border-emerald-400 flex items-center justify-center font-serif text-gold text-lg font-bold">
                ⚜
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold tracking-wide flex items-center gap-1.5">
                  Atelier Noir Concierge
                </h3>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Replies within 5 minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-200 hover:text-white p-1 rounded-full hover:bg-emerald-900/50 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content / Prompt Options */}
          <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto bg-atelier-900/60">
            {/* Greeting speech bubble */}
            <div className="bg-atelier-900 border border-atelier-800 rounded-xl p-3 text-xs text-neutral-300 leading-relaxed shadow-sm">
              <p className="text-gold font-medium mb-1">Welcome to Atelier Noir</p>
              <p>
                Our master artisans and personal shopping advisors are ready to assist with sizing, bespoke commissions, or direct ordering. Select an inquiry below or write to us directly:
              </p>
            </div>

            {/* Quick Prompt Buttons */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block px-1">
                Frequently Requested:
              </span>
              {prompts.map((p, idx) => {
                const IconComponent = p.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.text)}
                    className="w-full text-left p-2.5 rounded-lg bg-atelier-850 hover:bg-atelier-800 border border-atelier-800/80 hover:border-gold/40 text-xs text-neutral-200 transition flex items-center gap-2.5 group"
                  >
                    <IconComponent className="w-4 h-4 text-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="flex-1 font-light leading-snug">{p.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Message Input Footer */}
          <div className="p-3 bg-atelier-950 border-t border-atelier-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(customMsg);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your message to concierge..."
                className="flex-1 bg-atelier-900 border border-atelier-800 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!customMsg.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white p-2 rounded-lg transition"
                title="Send to WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-[9px] text-neutral-500 text-center mt-2 flex items-center justify-center gap-1">
              <span>Secure End-to-End Encrypted via WhatsApp</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
