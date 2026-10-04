"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getImageUrl, getPosters } from "@/lib/api";

const fallbackPosters = [
  { id: 1, src: "/1.webp", alt: "Poster Makanan" },
  { id: 2, src: "/2.webp", alt: "Poster Minuman" },
];

const slideDuration = 3000; // Durasi per slide dalam milidetik

export default function SplashScreen({ onFinish }) {
  const [posters, setPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const touchStartX = useRef(null);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onFinish?.();
    }, 300);
  }, [onFinish]);

  useEffect(() => {
    let isCurrent = true;

    getPosters()
      .then((result) => {
        const splashPosters = (result.data || [])
          .filter((poster) => poster.category === "splash" && Boolean(Number(poster.is_active)))
          .map((poster) => ({
            id: poster.id,
            src: getImageUrl(poster.image_url),
            alt: poster.title || "Poster splash Yotsa",
          }));

        if (isCurrent) setPosters(splashPosters);
      })
      .catch(() => {
        if (isCurrent) setPosters(fallbackPosters);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (posters.length < 2) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % posters.length);
    }, slideDuration);
    return () => clearInterval(interval);
  }, [posters.length]);

  useEffect(() => {
    if (isLoading) return;
    if (posters.length === 0) {
      onFinish?.();
      return;
    }

    const totalDisplaTime = posters.length === 1 ? 3000 : posters.length * slideDuration;

    const timeout = setTimeout(() => {
      handleClose();
    }, totalDisplaTime);
    return () => clearTimeout(timeout);
  }, [handleClose, isLoading, onFinish, posters.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        setActiveIndex((prev) => (prev + 1) % posters.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + posters.length) % posters.length);
      }
    }
    touchStartX.current = null;
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % posters.length);
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + posters.length) % posters.length);
  }

  if (!isVisible || isLoading || posters.length === 0) return null;

  return (
    // Overlay: gelap + blur, menutupi seluruh layar
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      onClick={handleClose}
    >
      {/* Card modal: klik di dalam sini TIDAK menutup modal */}
      <div
        className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-surface"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-md text-on-surface hover:bg-primary hover:text-white transition-colors"
          aria-label="Tutup"
        >
          ✕
        </button>

        {/* Tombol Navigasi Kiri & Kanan (Hanya tampil jika poster > 1) */}
        {posters.length > 1 && (
          <>
            {/* Tombol Previous (Kiri) */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/70 transition-all active:scale-95"
              aria-label="Poster Sebelumnya"
            >
              ❮
            </button>

            {/* Tombol Next (Kanan) */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/70 transition-all active:scale-95"
              aria-label="Poster Selanjutnya"
            >
              ❯
            </button>
          </>
        )}

        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {posters.map((poster) => (
            <div key={poster.id} className="relative h-full w-full shrink-0">
              <Image
                src={poster.src}
                alt={poster.alt}
                fill
                className="object-cover"
                sizes="(max-width: 448px) 100vw, 448px"
                quality={80}
                unoptimized
                priority
              />
            </div>
          ))}
        </div>

        {/* Indicator titik */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {posters.map((poster, index) => (
            <span
              key={poster.id}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === activeIndex ? "bg-white" : "bg-white/40"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}