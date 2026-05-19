import { useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import { HypeDrinkCarousel } from "@/components/HypeDrinkCarousel";
import { useState, useMemo } from "react";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const decodedCategory = category ? decodeURIComponent(category) : "";
  const filteredProducts = products.filter((p) => p.category === decodedCategory);

  // Agrupar produtos por subcategoria
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: typeof products } = {};
    filteredProducts.forEach((product) => {
      const key = product.subcategory || "Outros";
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(product);
    });
    return groups;
  }, [filteredProducts]);

  const subcategories = Object.entries(groupedProducts);
  const subcategoryNames = subcategories.map(([name]) => name);

  // Se nenhuma subcategoria foi selecionada, seleciona a primeira
  const activeSubcategory = selectedSubcategory || subcategoryNames[0];
  const displayedProducts = groupedProducts[activeSubcategory] || [];

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="py-16 sm:py-24 relative">
        {/* Botão de Voltar Fixo */}
        <button
          onClick={() => window.history.back()}
          className="fixed top-8 left-8 z-50 flex items-center justify-center bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título da Categoria */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              {decodedCategory}
            </h1>
            <p className="text-gray-600 text-lg">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} disponível{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Filtros de Subcategoria */}
          {subcategoryNames.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-3">
              {subcategoryNames.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => setSelectedSubcategory(subcategory)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeSubcategory === subcategory
                      ? "bg-black text-white shadow-lg"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          )}

          {/* Destaque do Hype Drink em Bebidas Funcionais */}
          {decodedCategory === "Bebidas Funcionais" && (
            <div className="mb-12">
              {(() => {
                const hypeDrink = displayedProducts.find(
                  (p) => p.id === "hype-drink"
                );
                if (hypeDrink) {
                  const hypeDrinkImages = [
                    "/manus-storage/WhatsAppImage2026-05-16at15.25.03(8)_185020c1.jpeg",
                    "/manus-storage/pasted_file_cOlFoP_image_e6a0d1a2.png",
                  ];
                  return (
                    <HypeDrinkCarousel
                      product={hypeDrink}
                      images={hypeDrinkImages}
                    />
                  );
                }
              })()}
            </div>
          )}

          {/* Produtos da Subcategoria Selecionada */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {displayedProducts
                .filter((p) => !(decodedCategory === "Bebidas Funcionais" && p.id === "hype-drink"))
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
