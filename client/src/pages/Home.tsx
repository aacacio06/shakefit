import { useState } from "react";
import Header from "@/components/Header";
import CartModal from "@/components/CartModal";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import CustomizeSection from "@/components/CustomizeSection";
import SlimDaySection from "@/components/SlimDaySection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <main>
        <HeroSection />
        <SearchBar />
        <CategoryGrid />
        <CustomizeSection />
        <SlimDaySection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
