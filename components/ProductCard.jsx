export default function ProductCard({ title, price, description, imageUrl, isBestSeller, altText, className = "", onClick }) {
  const handleOrderClick = (e) => {
    e.stopPropagation(); // biar gak ikut trigger onClick card (buka modal)

    const phoneNumber = "62895803032243"; // 👈 ganti dengan nomor WA kamu (format 62xxxx, tanpa +/spasi)
    const message = `Halo, saya ingin memesan *${title}* (${price}). Apakah masih tersedia?`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(waUrl, "_blank");
  };

  return (
    <div
      className={`glass-panel rounded-2xl overflow-hidden soft-shadow hover-shadow transition-all duration-300 flex flex-col group w-[min(280px,calc(100vw-2rem))] shrink-0 cursor-pointer ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      <div className="relative h-52 md:h-64 bg-surface-container overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={altText || title}
          src={imageUrl}
        />
        {isBestSeller && (
          <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-sm px-3 py-1 rounded-full font-label-sm text-label-sm text-primary">
            Terlaris
          </div>
        )}
      </div>
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-3">
          <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-2">{title}</h3>
          <span className="font-label-md text-label-md text-primary bg-primary/10 px-2 py-1 rounded-md whitespace-nowrap">
            {price}
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
          {description}
        </p>
        <button className="w-full border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors font-label-md text-label-md py-3 rounded-full cursor-pointer"
          onClick={handleOrderClick}>
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
}
