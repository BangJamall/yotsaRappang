"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-gutter max-w-container-max mx-auto h-16 md:h-18">
        <Link
          className="font-headline-md text-headline-md font-black text-primary"
          href="/"
          onClick={closeMenu}
        >YOTSA
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            href="#products"
          >
            Products
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            href="#store"
          >
            Store
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            href="#about"
          >
            About
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            href="#contact"
          >
            Contact
          </Link>
        </div>
        <button className="hidden sm:flex bg-primary hover:opacity-80 transition-opacity text-on-primary font-label-md text-label-md px-5 md:px-6 py-2.5 md:py-3 rounded-full items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer">
          Shop Now
        </button>
        <button
          type="button"
          className="md:hidden p-2 text-on-surface rounded-lg hover:bg-surface-variant transition-colors"
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="material-symbols-outlined">{isMenuOpen ? "close" : "menu"}</span>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface px-4 py-4 shadow-lg">
          <div className="flex flex-col gap-1">
            {["Products", "Store", "About", "Contact"].map((label) => (
              <Link
                key={label}
                className="px-3 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
                href={`#${label.toLowerCase()}`}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
            <button className="mt-2 bg-primary text-on-primary font-label-md text-label-md px-5 py-3 rounded-full shadow-lg shadow-primary/20">
              Shop Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
