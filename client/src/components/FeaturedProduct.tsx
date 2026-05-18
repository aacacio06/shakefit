import { useLocation } from "wouter";

interface FeaturedProductProps {
  id: string;
  name: string;
  image: string;
  imagePosition?: string;
  category: string;
}

export default function FeaturedProduct({
  name,
  image,
  imagePosition = "center 35%",
  category,
}: FeaturedProductProps) {
  const [, setLocation] = useLocation();

  const handleNavigateToCategory = () => {
    setLocation(`/cardapio/${encodeURIComponent(category)}`);
  };

  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Imagem */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group" onClick={handleNavigateToCategory}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              style={{ objectPosition: imagePosition }}
            />
            {/* Selo Dourado */}
            <div className="absolute top-4 right-4 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full p-4 shadow-lg transform rotate-12">
              <div className="text-center">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Mais</p>
                <p className="text-lg font-black text-white">Pedido</p>
              </div>
            </div>
          </div>

          {/* Nome Clicável */}
          <div className="flex items-center justify-center md:justify-start">
            <button
              onClick={handleNavigateToCategory}
              className="text-3xl sm:text-4xl font-bold text-black hover:text-yellow-600 transition-colors duration-300 text-center md:text-left"
            >
              {name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
