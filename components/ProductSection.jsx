"use client";

import { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const foodProducts = [
  {
    id: 1,
    title: "Nasi Kuning Komplit",
    price: "Rp 25.000",
    description: "Nasi kuning hangat dengan ayam suwir dan sambal khas.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    isBestSeller: true,
  },
  {
    id: 2,
    title: "Ayam Geprek Spesial",
    price: "Rp 32.000",
    description: "Ayam crispy dengan sambal pedas yang menggoda selera.",
    imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=80",
    isBestSeller: false,
  },
  {
    id: 3,
    title: "Sate Ayam Bumbu Kacang",
    price: "Rp 28.000",
    description: "Sate ayam dengan bumbu kacang gurih dan harum.",
    imageUrl: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80",
    isBestSeller: false,
  },
  {
    id: 4,
    title: "Mie Goreng Yotsa",
    price: "Rp 30.000",
    description: "Mie goreng dengan topping telur, sayur, dan cita rasa lezat.",
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
    isBestSeller: false,
  },
  {
    id: 5,
    title: "Bakso Spesial",
    price: "Rp 26.000",
    description: "Bakso kenyal dengan mie dan kuah rasa istimewa.",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
    isBestSeller: false,
  },
  {
    id: 6,
    title: "Rendang Daging",
    price: "Rp 35.000",
    description: "Rendang khas dengan daging empuk dan rempah kuat.",
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    isBestSeller: false,
  },
];

const drinkProducts = [
  {
    id: 1,
    title: "Es Teh Lemon",
    price: "Rp 12.000",
    description: "Minuman segar dengan rasa teh yang menyegarkan.",
    imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80",
    isBestSeller: true,
  },
  {
    id: 2,
    title: "Jus Alpukat",
    price: "Rp 18.000",
    description: "Jus alpukat lembut dan creamy dengan cita rasa premium.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    isBestSeller: false,
  },
  {
    id: 3,
    title: "Es Cokelat Oreo",
    price: "Rp 16.000",
    description: "Minuman dingin yang creamy dan cocok untuk santapan siang.",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80",
    isBestSeller: false,
  },
  {
    id: 4,
    title: "Smoothie Buah",
    price: "Rp 20.000",
    description: "Campuran buah segar dengan tekstur lembut dan manis alami.",
    imageUrl: "https://images.unsplash.com/photo-1577805947697-89e18298d3ed?auto=format&fit=crop&w=900&q=80",
    isBestSeller: false,
  },
  {
    id: 5,
    title: "Lemon Mint Soda",
    price: "Rp 15.000",
    description: "Minuman dingin yang menyegarkan dengan sentuhan mint.",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f2b0c8f3?auto=format&fit=crop&w=900&q=80",
    isBestSeller: false,
  },
  {
    id: 6,
    title: "Cappuccino Dingin",
    price: "Rp 22.000",
    description: "Kopi cappuccino dingin dengan tekstur lembut dan harum.",
    imageUrl: "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80",
    isBestSeller: false,
  },
];

const productGroups = [
  { id: "makanan", label: "Makanan", items: foodProducts },
  { id: "minuman", label: "Minuman", items: drinkProducts },
];

export default function ProductSection() {
  const foodRef = useRef(null);
  const drinkRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    <section className="px-4 sm:px-gutter max-w-container-max mx-auto py-16 md:py-section-gap-desktop" id="products">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">Produk Unggulan Kami</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Pilihan favorit kami untuk memenuhi kebutuhan santap Anda.
        </p>
      </div>

      <div className="space-y-12">
        {productGroups.map((group) => {
          const scrollRef = group.id === "makanan" ? foodRef : drinkRef;

          return (
            <div key={group.id} className="space-y-4">
              <h3 className="font-headline-md text-headline-md text-on-surface capitalize">
                {group.label}
              </h3>

              <div className="relative group">
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

                <div className="overflow-hidden md:px-12">
                  <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
