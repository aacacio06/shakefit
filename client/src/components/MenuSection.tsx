import { useState } from "react";
import { categories, products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  return (
    <section id="cardapio" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">
            NOSSO CARDÁPIO
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Nossos Produtos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Escolha entre nossas opções saudáveis e deliciosas, feitas com ingredientes premium.
          </p>
        </div>

        {/* Abas de Categorias */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base ${
                activeCategory === category
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
