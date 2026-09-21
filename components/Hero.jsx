export default function Hero() {
  return (
    <header className="relative overflow-hidden px-4 sm:px-gutter max-w-container-max mx-auto py-section-gap-mobile md:py-section-gap-desktop flex flex-col md:flex-row items-center gap-8 md:gap-10">
      {/* Motif batik, tiled, sebagai tekstur latar */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-repeat opacity-[0.08]"
        style={{ backgroundImage: "url('/batik.webp')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex-1 min-w-0 flex flex-col items-start gap-6">
        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface">
          Kualitas Premium, <br className="hidden sm:block" />
          <span className="gradient-text">Rasa Lokal Nusantara</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
          Mendukung pengrajin lokal dengan menghadirkan produk UMKM berkualitas tinggi untuk kebutuhan modern Anda.
        </p>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 mt-2 sm:mt-4">
          <button className="w-full sm:w-auto justify-center bg-gradient-to-r from-primary to-secondary text-on-primary font-label-md text-label-md px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 cursor-pointer">
            Mulai Belanja
            <span className="material-symbols-outlined" data-icon="arrow_forward">
              arrow_forward
            </span>
          </button>
          <button className="w-full sm:w-auto border border-outline-variant text-on-surface font-label-md text-label-md px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-surface-variant transition-colors cursor-pointer">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 min-w-0 w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-surface">
        <img
          alt="Gradient Aesthetic Hero"
          className="w-full h-full object-cover"
          src="/yotsatrans.png"
        />
      </div>
    </header>
  );
}