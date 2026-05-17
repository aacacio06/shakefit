import { Product } from "@/data/products";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddClick?: (product: Product) => void;
}

export default function ProductCard({ product, onAddClick }: ProductCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagem */}
      <div className="relative w-full h-48 bg-gray-800 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
            {product.badge}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Nutrição */}
        {(product.calories !== undefined || product.protein !== undefined) && (
          <div className="flex gap-4 mb-4 text-xs text-gray-400">
            {product.calories !== undefined && <span>{product.calories} kcal</span>}
            {product.protein !== undefined && <span>{product.protein}g prot</span>}
          </div>
        )}

        {/* Preço e Botão */}
        <div className="flex items-center justify-between">
          <span className="text-yellow-400 font-bold text-lg">R$ {product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddClick?.(product)}
            className="bg-yellow-400 text-black p-2 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
