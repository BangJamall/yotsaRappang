import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-gutter max-w-container-max mx-auto h-18">
        <Link
          className="font-headline-md text-headline-md font-black text-primary"
          href="/"
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
        <button className="bg-primary hover:opacity-80 transition-opacity text-on-primary font-label-md text-label-md px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer">
          Shop Now
        </button>
      </div>
    </nav>
  );
}
