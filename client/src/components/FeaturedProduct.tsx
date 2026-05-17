import { useLocation } from "wouter";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface FeaturedProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imagePosition?: string;
  category: string;
}

export default function FeaturedProduct({
  id,
  name,
  description,
  price,
  image,
  imagePosition = "center 35%",
  category,
}: FeaturedProductProps) {
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();

  const handleNavigateToCategory = () => {
    setLocation(`/cardapio/${encodeURIComponent(category)}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      quantity: 1,
      image,
    });
  };

  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            Mais Pedido
          </h2>
          <p className="text-gray-600 text-lg">O favorito dos nossos clientes</p>
        </div>

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

          {/* Informações */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wider mb-2">
                Destaque
              </p>
              <h3 className="text-4xl font-bold text-black mb-3">{name}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-black">
                R$ {price.toFixed(2)}
              </span>
              <span className="text-gray-500 text-sm">por unidade</span>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleNavigateToCategory}
                className="flex-1 bg-black text-white font-semibold py-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 text-lg"
              >
                Ver Categoria
              </button>
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-yellow-500 text-black font-semibold py-4 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                <ShoppingCart size={20} />
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
