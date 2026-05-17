import { useLocation } from "wouter";
import { categories } from "@/data/products";

export default function CategoryGrid() {
  const [location, setLocation] = useLocation();

  const categoryIcons: Record<string, string> = {
    "Shakes Proteicos": "🥤",
    "Bebidas Funcionais": "🧃",
    "Salgados Proteicos": "🥐",
    "Sobremesas Proteicas": "🍰",
    "Combos": "🎁",
  };

  const handleCategoryClick = (category: string) => {
    setLocation(`/cardapio/${encodeURIComponent(category)}`);
  };

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-4">
          Nosso Cardápio
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Escolha uma categoria para ver todos os produtos
        </p>

        {/* Grid de Categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 hover:border-black hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {categoryIcons[category] || "📦"}
              </div>
              <h3 className="text-xl font-bold text-black group-hover:text-black transition-colors">
                {category}
              </h3>
              <p className="text-gray-600 text-sm mt-2">Ver produtos</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
