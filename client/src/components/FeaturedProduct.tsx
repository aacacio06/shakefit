import { useLocation } from "wouter";
import { useState, useEffect } from "react";

interface FeaturedProductProps {
  id: string;
  name: string;
  image: string;
  imagePosition?: string;
  category: string;
  images?: string[];
}

export default function FeaturedProduct({
  name,
  image,
  imagePosition = "center 35%",
  category,
  images = [],
}: FeaturedProductProps) {
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = images.length > 0 ? images : [image];
  const displayImage = allImages[currentImageIndex];

  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [allImages.length]);

  const handleNavigateToCategory = () => {
    setLocation(`/cardapio/${encodeURIComponent(category)}`);
  };

  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Imagem com Carrossel */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group" onClick={handleNavigateToCategory}>
            <img
              src={displayImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              style={{ objectPosition: imagePosition }}
            />
            {/* Indicadores de Slides */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
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
