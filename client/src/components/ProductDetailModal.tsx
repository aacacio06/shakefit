import { Product } from "@/data/products";
import { X } from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-black" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {/* Imagem */}
          {product.image && (
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-xs h-auto rounded-lg"
              />
            </div>
          )}

          {/* Descrição */}
          <div>
            <h3 className="text-lg font-bold text-black mb-2">Descrição</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Preço */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg font-bold text-black">R$ {product.price.toFixed(2)}</p>
          </div>

          {/* Tabela Nutricional */}
          {(product.calories || product.protein || product.carbs || product.fiber || product.fat || product.sodium) && (
            <div>
              <h3 className="text-lg font-bold text-black mb-4">Informações Nutricionais</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.calories && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Calorias</p>
                    <p className="text-lg font-bold text-black">{product.calories} kcal</p>
                  </div>
                )}
                {product.protein && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Proteína</p>
                    <p className="text-lg font-bold text-black">{product.protein}</p>
                  </div>
                )}
                {product.carbs && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Carboidratos</p>
                    <p className="text-lg font-bold text-black">{product.carbs}</p>
                  </div>
                )}
                {product.fiber && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Fibras</p>
                    <p className="text-lg font-bold text-black">{product.fiber}</p>
                  </div>
                )}
                {product.fat && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Gordura</p>
                    <p className="text-lg font-bold text-black">{product.fat}</p>
                  </div>
                )}
                {product.sodium && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Sódio</p>
                    <p className="text-lg font-bold text-black">{product.sodium}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ingredientes */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-black mb-4">Ingredientes</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-black font-bold mr-3">•</span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Sabores */}
          {product.flavors && product.flavors.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-black mb-4">Sabores Disponíveis</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.flavors.map((flavor, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                    {flavor}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
