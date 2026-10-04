export default function Hero() {
  return (
    <header className="relative w-full overflow-hidden py-section-gap-mobile md:py-section-gap-desktop">
      {/* Motif batik, tiled, sebagai tekstur latar */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-repeat opacity-[0.08] w-full"
        style={{ backgroundImage: "url('/batik.webp')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-container-max mx-auto px-4 sm:px-gutter flex flex-col md:flex-row items-center gap-8 md:gap-10">
        <div className="flex-1 min-w-0 flex flex-col items-start gap-6">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface">
            Kualitas Premium, <br className="hidden sm:block" />
            <span className="gradient-text">Jajanan Favorit</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Solusi camilan enak dan hemat setiap hari. Dibuat dengan sepenuh hati oleh pedagang lokal untuk menemani waktu kumpul bersama.
          </p>
            <a href="/#products" className="w-full">
            <button className="w-full justify-center bg-gradient-to-r from-primary to-secondary text-on-primary font-label-md text-label-md px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 cursor-pointer">
              Mulai Belanja
              <span className="material-symbols-outlined" data-icon="arrow_forward">
                arrow_forward
              </span>
            </button>
            </a>
        </div>

        <div className="relative z-10 flex-1 min-w-0 w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-surface">
          <img
            alt="Gradient Aesthetic Hero"
            className="w-full h-full object-cover"
            src="/yotsatrans.png"
          />
        </div>
      </div>
    </header>
  );
}