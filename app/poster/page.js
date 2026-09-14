import Image from "next/image";

export default function PosterSection() {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-3 justify-center w-full items-center max-w-6xl mx-auto mb-4 px-4 md:px-6">
      <div className="w-full md:w-1/2 text-center group">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors duration-300">
          Poster Makanan
        </h2>
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
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

      <div className="w-full md:w-1/2 text-center group">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors duration-300">
          Poster Minuman
        </h2>
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
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
  );
}