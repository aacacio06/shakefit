import React, { useState } from "react";
import { Product } from "@/data/products";
import { Carousel } from "./Carousel";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import ProductDetailModal from "./ProductDetailModal";

interface HypeDrinkCarouselProps {
  product: Product;
  images: string[];
}

export function HypeDrinkCarousel({ product, images }: HypeDrinkCarouselProps) {
  const { addItem } = useCart();
  const [showDetail, setShowDetail] = useState(false);

  const handleAddToCart = () => {
    addItem({
      product,
      quantity: 1,
    });
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <>
      <ProductDetailModal
        product={showDetail ? product : null}
        onClose={() => setShowDetail(false)}
      />
      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
        {/* Carrossel */}
        <div className="relative">
          <Carousel images={images} interval={1500} autoPlay={true} />
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Badge */}
          {product.badge && (
            <div className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold mb-3">
              {product.badge}
            </div>
          )}

          {/* Título */}
          <h3 className="text-2xl font-bold text-black mb-2">{product.name}</h3>

          {/* Descrição */}
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>

          {/* Nutrição */}
          {(product.calories !== undefined ||
            product.protein !== undefined ||
            product.carbs !== undefined ||
            product.fiber !== undefined) && (
            <div className="flex flex-wrap gap-3 mb-6 text-sm text-gray-700 bg-white p-3 rounded-lg">
              {product.calories !== undefined && (
                <span className="font-semibold">
                  {product.calories} kcal
                </span>
              )}
              {product.protein !== undefined && (
                <span className="font-semibold">{product.protein} prot</span>
              )}
              {product.carbs !== undefined && (
                <span className="font-semibold">{product.carbs} carbs</span>
              )}
              {product.fiber !== undefined && (
                <span className="font-semibold">{product.fiber} fibras</span>
              )}
            </div>
          )}

          {/* Preço e Botões */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-3xl font-bold text-black">
              R$ {product.price.toFixed(2)}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDetail(true)}
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-black transition-colors font-semibold"
              >
                Ver Detalhes
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
