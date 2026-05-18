import { useLocation } from "wouter";
import { categories } from "@/data/products";

export default function CategoryGrid() {
  const [location, setLocation] = useLocation();

  const categoryImages: Record<string, string> = {
    "Shakes Proteicos": "/manus-storage/WhatsAppImage2026-05-16at15.25.03(4)_88c33fdb.jpeg",
    "Bebidas Funcionais": "/manus-storage/WhatsAppImage2026-05-17at11.43.13_273e2553.jpeg",
    "Salgados Proteicos": "/manus-storage/WhatsAppImage2026-05-16at16.36.59_e7f28ed3.jpeg",
    "Sobremesas Proteicas": "",
    "Combos": "/manus-storage/WhatsAppImage2026-05-16at15.25.03(6)_88cc8869.jpeg",
  };

  const handleCategoryClick = (category: string) => {
    setLocation(`/cardapio/${encodeURIComponent(category)}`);
  };

  return (
    <section id="cardapio" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-4">
          Nosso Cardápio
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Escolha uma categoria para ver todos os produtos
        </p>

        {/* Grid de Categorias */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 hover:border-black hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              {categoryImages[category] ? (
                <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={categoryImages[category]}
                    alt={category}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                    style={category === "Combos" ? {
                      objectFit: "cover",
                      objectPosition: "center 30%"
                    } : category === "Bebidas Funcionais" ? {
                      objectFit: "cover",
                      objectPosition: "center 60%"
                    } : {
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-48 mb-4 rounded-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Imagem em breve</span>
                </div>
              )}
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
