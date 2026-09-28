import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function AdminDeleteModal({ isOpen, onClose, onConfirm, productTitle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-atelier-950 border border-rose-900/60 rounded-xl shadow-2xl p-6 space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-atelier-800">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-serif text-base font-semibold tracking-wider uppercase text-neutral-100">
              Confirm Archival Removal
            </h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          Are you certain you wish to permanently delete <strong className="text-neutral-100 font-serif">"{productTitle}"</strong> from the master catalog? This action cannot be reversed.
        </p>

        <div className="pt-3 border-t border-atelier-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-atelier-900 text-neutral-300 hover:text-white text-xs uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs uppercase tracking-widest flex items-center gap-1.5 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Jacket</span>
          </button>
        </div>
      </div>
    </div>
  );
}
