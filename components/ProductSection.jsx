import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    title: "Mug Keramik Modern",
    price: "Rp 85.000",
    description: "Keramik buatan tangan dengan desain minimalis.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu3qyDLW_XyKFH8I0GzB6_JA9BJSZOo73RWfgRnHXhKeGqQbGdUv_pJfungXGAcZI4FkKh-iTMAmPHW1YpfO-85bLj19Ec5KBvntvm_jFGp43CFVYs5z9kUXrhO1z3TBYTX-hPd0UoMBiDWuMHAyoo7dXP9SPBttEkr8GKenxlOsdS6p2TTZDEnsYqdVb3qBK50fSvWp9U64aUJ8yPKnydFH41Ht3qI3uVZMpZWVF_9_CJL6UoLkLX",
    isBestSeller: true,
  },
  {
    id: 2,
    title: "Dompet Kulit Asli",
    price: "Rp 250.000",
    description: "Dompet kulit premium dengan ketahanan luar biasa.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyaFVQEL9BG7bRdzp-PweBcZ77-M24SM5uu2fVIduoL1HuFneSufDu3P5CBnXdMcxvoPGhy1C-b13slpSCKxwFOEySTL3V5LoNWwgsRmIsN-fOF-2vmo7HH4KB3Ggq1MwV_TNcC7yVJyNQI1awalROOmfDScAsS0Z3kxaEk8rKAGWr7g61ZvjA8bQQX2I1q8c_7reKiNAA5nRWWRlIx9Rhh3byMd3_EhZFAMOFNz0BUOKu1Dvcd4wH",
    isBestSeller: false,
  },
  {
    id: 3,
    title: "Lilin Aromaterapi",
    price: "Rp 120.000",
    description: "Lilin dengan aroma menenangkan untuk relaksasi.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEWVSoWa08rGhjAgZmKVdznVv2UTN3Uag5pEJnAdJW52djMe-EEyClCTBbKI7xrApvmtKrYpALYMbnJoPdpM5HJExRNCuRzYmmkpAWHt_FYDz230lHmTQy9s9k_TkQWbQ_1M2-w6wRyZsXlpImIggkrS1m5bpuUJ2PJhnpFtJrMknZuZICmHZGNdePrAZFyCbtwLOj1sSn5OVIqcJHUTm8nBHKBQUq4Dqv1gzvZvLVTSwURQJKrC6v",
    isBestSeller: false,
  }
];

export default function ProductSection() {
  return (
    <section className="px-gutter max-w-container-max mx-auto py-section-gap-desktop" id="products">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Produk Unggulan Kami</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Karya terbaik dari tangan-tangan terampil pengrajin lokal.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
