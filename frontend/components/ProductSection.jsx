"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { getImageUrl, getProducts } from "@/lib/api";

export default function ProductSection() {
  const foodRef = useRef(null);
  const drinkRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsByCategory, setProductsByCategory] = useState({
    makanan: [],
    minuman: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    getProducts({ activeOnly: true })
      .then((result) => {
        if (!isCurrent) return;

        const products = { makanan: [], minuman: [] };
        (Array.isArray(result.data) ? result.data : []).forEach((product) => {
          const category = String(product.category || "").toLowerCase();
          if (!products[category]) return;

          const price = Number(product.price);
          products[category].push({
            id: product.id,
            title: product.title,
            category,
            price: Number.isFinite(price)
              ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(price)
              : product.price,
            description: product.description || "",
            imageUrl: getImageUrl(product.image_url || product.imageUrl),
            isBestSeller: Boolean(Number(product.is_best_seller ?? product.isBestSeller)),
          });
        });

        setProductsByCategory(products);
      })
      .catch(() => {
        if (!isCurrent) return;
        setProductsByCategory({ makanan: [], minuman: [] });
        setLoadError("Produk belum dapat dimuat. Silakan coba lagi nanti.");
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const productGroups = [
    { id: "makanan", label: "Makanan", items: productsByCategory.makanan },
    { id: "minuman", label: "Minuman", items: productsByCategory.minuman },
  ];

  const scrollProducts = (ref, direction) => {
    if (!ref.current) return;

    const cardWidth = ref.current.querySelector(".product-card")?.getBoundingClientRect().width || 280;
    const gap = 24;
    ref.current.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="min-w-0 max-w-full px-4 sm:px-gutter max-w-container-max mx-auto py-10 md:py-section-gap-desktop" id="products">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">Produk Unggulan Kami</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Pilihan favorit kami untuk memenuhi kebutuhan santap Anda.
        </p>
      </div>

      {isLoading ? (
        <p className="py-8 text-center text-on-surface-variant" role="status">
          Memuat produk...
        </p>
      ) : loadError ? (
        <p className="py-8 text-center text-on-surface-variant" role="alert">
          {loadError}
        </p>
      ) : productGroups.every((group) => group.items.length === 0) ? (
        <p className="py-8 text-center text-on-surface-variant">
          Belum ada produk tersedia.
        </p>
      ) : (
      <div className="space-y-8">
        {productGroups.filter((group) => group.items.length > 0).map((group) => {
          const scrollRef = group.id === "makanan" ? foodRef : drinkRef;

          return (
            <div key={group.id} className="space-y-4">
              <h3 className="font-headline-md text-headline-md text-on-surface capitalize">
                {group.label}
              </h3>

              <div className="relative group min-w-0 max-w-full">
                <button
                  type="button"
                  onClick={() => scrollProducts(scrollRef, -1)}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur-md border border-white/30 rounded-full items-center justify-center text-primary shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white"
                  aria-label={`Geser ${group.label} ke kiri`}
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => scrollProducts(scrollRef, 1)}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur-md border border-white/30 rounded-full items-center justify-center text-primary shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white"
                  aria-label={`Geser ${group.label} ke kanan`}
                >
                  →
                </button>

                <div className="min-w-0 max-w-full overflow-hidden md:px-12">
                  <div
                    ref={scrollRef}
                    className="flex min-w-0 max-w-full touch-pan-x gap-4 overscroll-x-contain overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory sm:gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {group.items.map((product) => (
                      <ProductCard key={`${group.id}-${product.id}`} {...product} className="product-card"
                        onClick={() => setSelectedProduct(product)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
