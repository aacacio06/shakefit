import { useState } from "react";
import Header from "@/components/Header";
import CartModal from "@/components/CartModal";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProduct from "@/components/FeaturedProduct";
import Footer from "@/components/Footer";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <main>
        <SearchBar />
        <CategoryGrid />
        <FeaturedProduct
          id="hype-drink-turbo"
          name="Hype Drink Turbo"
          description="Bebida energética com poder total. Perfeita para quem busca energia, disposição e um sabor incrível. Feita com ingredientes selecionados para potencializar seu desempenho."
          price={25.00}
          image="/manus-storage/WhatsAppImage2026-05-16at15.25.01(1)_380b54d6.jpeg"
          imagePosition="center 35%"
          category="Bebidas Funcionais"
        />
      </main>
      <Footer />
    </div>
  );
}
