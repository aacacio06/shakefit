import { useParams, useRouter } from "wouter";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import { useState } from "react";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  const decodedCategory = category ? decodeURIComponent(category) : "";
  const filteredProducts = products.filter((p) => p.category === decodedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Botão de Voltar e Título da Categoria */}
          <div className="mb-12">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors mb-6 font-semibold"
            >
              <ArrowLeft size={20} />
              Voltar
            </button>
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              {decodedCategory}
            </h1>
            <p className="text-gray-600 text-lg">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} disponível{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Grid de Produtos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
