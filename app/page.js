import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import LocationCTA from "@/components/LocationCTA";

export default function Home() {
  return (
    <>
      <main className="flex flex-col">
        <Hero />
        <ProductSection />
        <LocationCTA />
      </main>
    </>
  );
}
