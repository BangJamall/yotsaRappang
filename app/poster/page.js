import Image from "next/image";

export default function PosterSection() {
  return (
    <div className="relative w-full py-4">
      {/* Motif batik */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-repeat opacity-[0.08]"
        style={{ backgroundImage: "url('/batik.webp')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-4 justify-center w-full items-center max-w-3xl mx-auto px-4">
        {/* Card Poster Makanan */}
        <div className="w-full md:w-1/2 text-center group bg-white rounded-2xl p-2.5 sm:p-3 shadow-md">
          <h2 className="font-headline-md text-base sm:text-lg text-on-surface my-1.5 group-hover:text-primary group-hover:font-bold transition-duration-300">
            Poster Makanan
          </h2>
          {/* Rasio 3/4 agar pas dengan bentuk poster memanjang */}
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
            <Image
              src="/1.webp"
              alt="Poster Makanan"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </div>
        </div>

        {/* Card Poster Minuman */}
        <div className="w-full md:w-1/2 text-center group bg-white rounded-2xl p-2.5 sm:p-3 shadow-md">
          <h2 className="font-headline-md text-base sm:text-lg text-on-surface my-1.5 group-hover:text-primary group-hover:font-bold transition-duration-300">
            Poster Minuman
          </h2>
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
            <Image
              src="/2.webp"
              alt="Poster Minuman"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </div>
        </div>
      </div>
    </div>
  );
}