export default function LocationCTA() {
  return (
    <section className="bg-surface-container-low py-section-gap-desktop" id="about">
      <div className="px-gutter max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Toko Offline Kami</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Kunjungi toko fisik kami untuk melihat dan merasakan langsung kualitas produk-produk lokal terbaik yang kami tawarkan.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                <span className="material-symbols-outlined" data-icon="location_on">location_on</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-on-surface font-bold">Alamat</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Jl. Sudirman No. 123, Jakarta Selatan</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                <span className="material-symbols-outlined" data-icon="schedule">schedule</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-on-surface font-bold">Jam Buka</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Senin - Minggu: 09:00 - 21:00</p>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-outline-variant/30">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Pesan Langsung?</h3>
            <button className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-label-md text-label-md px-8 py-4 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-[#25D366]/20 cursor-pointer">
              <span className="material-symbols-outlined" data-icon="chat">chat</span>
              Pesan via WhatsApp
            </button>
          </div>
        </div>
        <div className="flex-1 w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl relative">
          <img
            className="w-full h-full object-cover"
            alt="Jakarta Location"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5yWJZrp6bswYuVYSZikVjQ7KepAqgIepqla2M4S6Zrtyswwv0ygeb7kVwVaTTIBZlV8P9E_-75v6pjlWn715N1B_l3LgkTZ7uKuGIIlcaNPU_4jDJ0uOIINgi-d1P3mwY_v4IToSFNqOrSqS748F3QLQfks2PMC1KObDLLbzvtQuL6d39ed57znNSP0UFNKQTDh5i-Exb6I5E2BOQgpQ9QwwhJv7Un7KO-kbrr1mOn1xXksU90RTW"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
