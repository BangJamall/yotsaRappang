export default function LocationCTA() {
  // Ganti koordinat atau nama tempat sesuai lokasi persis toko Anda
  const googleMapsUrl = "https://www.google.com/maps/place/YOTSA+(Food+%26+Drink)/@-3.8454721,119.8262477,19z/data=!4m10!1m2!2m1!1skedai+yotsa+lanrang!3m6!1s0x2d95cba5ba1808ff:0x17ef6dca41fe65ec!8m2!3d-3.8454721!4d119.82714!15sChNrZWRhaSB5b3RzYSBsYW5yYW5nWhUiE2tlZGFpIHlvdHNhIGxhbnJhbmeSAQRkZWxp4AEA!16s%2Fg%2F11k46g9xfm?entry=ttu&g_ep=EgoyMDI2MDgzMC4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section className="bg-surface-container-low py-16 md:py-section-gap-desktop" id="about">
      <div className="px-4 sm:px-gutter max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 space-y-6 md:space-y-8">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">Toko Offline Kami</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Bikin penasaran? Jangan lupa berkunjung ke toko kami dan nikmati langsung sajian makanan dan minuman terbaik kami!
            </p>
          </div>
          <div className="space-y-4">
            {/* Bagian Alamat yang dapat diklik */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-3 -ml-3 rounded-2xl transition-colors hover:bg-surface-container/50 group cursor-pointer"
            >
              <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined" data-icon="location_on">location_on</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-label-md text-label-md text-on-surface font-bold">Alamat</h4>
                  <span className="material-symbols-outlined text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                  Jl. Poros Bulo, DSN.LANRANG, Kab. Sidenreng Rappang
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-3 -ml-3 hover:bg-surface-container/50 group cursor-pointer">
              <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined" data-icon="schedule">schedule</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-on-surface font-bold">Jam Buka</h4>
                <p className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Senin - Minggu: 10:00 - 19:00</p>
              </div>
            </div>
          </div>
          <div className="pt-5 md:pt-6 border-t border-outline-variant/30">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Pesan Langsung?</h3>
            <button className="w-full sm:w-auto justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white font-label-md text-label-md px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-[#25D366]/20 cursor-pointer">
              <span className="material-symbols-outlined" data-icon="chat">chat</span>
              Pesan via WhatsApp
            </button>
          </div>
        </div>

        {/* Bagian Peta Interaktif (Menggunakan Google Maps Embed iFrame) */}
        <div className="flex-1 w-full h-80 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl relative group">
          <iframe
            title="Lokasi Toko Offline"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.3323547849646!2d119.82456517582498!3d-3.845472096128032!2m3!1f0!0f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d95cba5ba1808ff%3A0x17ef6dca41fe65ec!2sYOTSA%20(Food%20%26%20Drink)!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}