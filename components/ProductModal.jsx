"use client";

import { useEffect } from "react";

export default function ProductModal({ product, onClose }) {
  // Tutup modal dengan tombol Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!product) return null;

    const handleOrderClick = () => {
    const phoneNumber = "6281234567890"; // 👈 samakan dengan nomor di ProductCard
    const message = `Halo, saya ingin memesan *${product.title}* (${product.price}). Apakah masih tersedia?`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose} // klik area luar -> tutup modal
    >
      <div
        className="bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} // cegah klik di dalam modal ikut menutup
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-md text-on-surface hover:bg-primary hover:text-white transition-colors"
          aria-label="Tutup"
        >
          ✕
        </button>

        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-56 object-cover"
        />

        <div className="p-6 space-y-3">
          {product.isBestSeller && (
            <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
              Best Seller
            </span>
          )}
          <h3 className="font-headline-md text-headline-md text-on-surface">
            {product.title}
          </h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {product.description}
          </p>
          <p className="font-headline-sm text-primary">{product.price}</p>

          <button
            type="button"
            className="w-full mt-2 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            onClick={handleOrderClick}
          >
            Pesan Via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}