"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getImageUrl, getPosterByCategory } from "@/lib/api";

export default function PosterSection() {
  const [posters, setPosters] = useState({
    makanan: { title: "Poster Makanan", image: "/1.webp" },
    minuman: { title: "Poster Minuman", image: "/2.webp" },
  });

  useEffect(() => {
    let isCurrent = true;

    Promise.all(
      ["makanan", "minuman"].map(async (category) => {
        try {
          const result = await getPosterByCategory(category);
          return [category, result.data];
        } catch {
          return [category, null];
        }
      }),
    ).then((results) => {
      if (!isCurrent) return;

      setPosters((currentPosters) => {
        const nextPosters = { ...currentPosters };
        results.forEach(([category, poster]) => {
          if (poster) {
            nextPosters[category] = {
              title: poster.title,
              image: getImageUrl(poster.image_url),
            };
          }
        });
        return nextPosters;
      });
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  const posterList = [posters.makanan, posters.minuman];

  return (
    <div className="relative w-full py-4">
      {/* Motif batik */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-repeat opacity-[0.08]"
        style={{ backgroundImage: "url('/batik.webp')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-4 justify-center w-full items-center max-w-3xl mx-auto px-4">
        {posterList.map((poster) => (
          <div
            key={poster.title}
            className="w-full md:w-1/2 text-center group bg-white rounded-2xl p-2.5 sm:p-3 shadow-md"
          >
            <h2 className="font-headline-md text-base sm:text-lg text-on-surface my-1.5 group-hover:text-primary group-hover:font-bold transition-duration-300">
              {poster.title}
            </h2>
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src={poster.image}
                alt={poster.title}
                width={900}
                height={1200}
                unoptimized
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
