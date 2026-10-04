"use client";

import SplashScreen from "@/components/splashScreen";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import LocationCTA from "@/components/LocationCTA";
import {useState} from "react";

export default function Home() {

  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
    {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <main className="flex flex-col">
        <Hero />
        <ProductSection />
        <LocationCTA />
      </main>
    </>
  );
}
