import { Product } from "@/data/products";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      product,
      quantity: 1,
    });
    toast.success(`${product.name} adicionado ao carrinho!`);
  }
  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
      {/* Imagem */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23E5E7EB' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%239CA3AF' text-anchor='middle' dominant-baseline='middle'%3E{product.name}%3C/text%3E%3C/svg%3E"}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
            {product.badge}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="text-black font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Nutrição */}
        {(product.calories !== undefined || product.protein !== undefined || product.carbs !== undefined || product.fiber !== undefined) && (
          <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-600">
            {product.calories !== undefined && <span>{product.calories} kcal</span>}
            {product.protein !== undefined && <span>{product.protein} prot</span>}
            {product.carbs !== undefined && <span>{product.carbs} carbs</span>}
            {product.fiber !== undefined && <span>{product.fiber} fibras</span>}
          </div>
        )}

        {/* Preço e Botão */}
        <div className="flex items-center justify-between">
          <span className="text-black font-bold text-lg">R$ {product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
