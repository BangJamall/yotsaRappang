import Image from "next/image";

export default function PosterSection() {
  return (
    <div className="relative w-full">
      {/* Motif batik — sekarang jadi child, otomatis ikut tinggi section ini */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-repeat opacity-[0.08]"
        style={{ backgroundImage: "url('/batik.webp')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-3 justify-center w-full items-center max-w-6xl mx-auto mb-4 px-4 md:px-6">
        <div className="w-full md:w-1/2 text-center group bg-white rounded-2xl p-3 sm:p-6">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors duration-300">
            Poster Makanan
          </h2>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src="/1.webp"
              alt="Poster Makanan"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 90vw, 50vw"
              quality={80}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 text-center group bg-white rounded-2xl p-3 sm:p-6">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors duration-300">
            Poster Minuman
          </h2>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src="/2.webp"
              alt="Poster Minuman"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 90vw, 50vw"
              quality={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
