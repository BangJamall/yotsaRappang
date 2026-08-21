import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import LocationCTA from "@/components/LocationCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <ProductSection />
        <LocationCTA />
      </main>
      <Footer />
    </>
  );
}
