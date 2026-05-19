import { Product } from "@/data/products";
import { X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addItem } = useCart();
  const [selectedMilk, setSelectedMilk] = useState<"normal" | "zero">("normal");
  const [selectedSauces, setSelectedSauces] = useState<"one" | "two">("one");

  if (!product) return null;

  const isWaffle = product.id === "waffle-simples" || product.id === "waffle-cobertura";
  const isShakeProteico = product.category === "Shakes Proteicos";

  const calculatePrice = () => {
    let basePrice = product.price;
    let additionalPrice = 0;

    if (isWaffle) {
      // Leite zero lactose: +R$ 2,00 por calda
      if (selectedMilk === "zero") {
        if (selectedSauces === "one") {
          additionalPrice += 2.00;
        } else if (selectedSauces === "two") {
          additionalPrice += 4.00;
        }
      }
    } else if (isShakeProteico) {
      // Leite zero lactose: +R$ 2,00
      if (selectedMilk === "zero") {
        additionalPrice += 2.00;
      }
    }

    return basePrice + additionalPrice;
  };

  const handleAddToCart = () => {
    const finalPrice = calculatePrice();
    let customizations: any = undefined;

    if (isWaffle) {
      customizations = {
        milk: selectedMilk === "zero" ? "Zero Lactose" : "Desnatado",
        sauces: selectedSauces === "one" ? "Uma Calda" : "Duas Caldas",
      };
    } else if (isShakeProteico) {
      customizations = {
        milk: selectedMilk === "zero" ? "Zero Lactose" : "Desnatado",
      };
    }

    addItem({
      product: { ...product, price: finalPrice },
      quantity: 1,
      customizations,
    });

    toast.success(`${product.name} adicionado ao carrinho!`);
    onClose();
  };

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

          {/* Opções de Customização para Waffle */}
          {isWaffle && (
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-black">Personalize seu Waffle</h3>

              {/* Opção de Leite */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Tipo de Leite</p>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="milk"
                      value="normal"
                      checked={selectedMilk === "normal"}
                      onChange={() => setSelectedMilk("normal")}
                      className="mr-3"
                    />
                    <span className="text-gray-700">Desnatado <span className="text-green-600 font-semibold">+R$ 0,00</span></span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="milk"
                      value="zero"
                      checked={selectedMilk === "zero"}
                      onChange={() => setSelectedMilk("zero")}
                      className="mr-3"
                    />
                    <span className="text-gray-700">Zero Lactose <span className="text-orange-600 font-semibold">+R$ 2,00 por calda</span></span>
                  </label>
                </div>
              </div>

              {/* Opção de Caldas */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Número de Caldas</p>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sauces"
                      value="one"
                      checked={selectedSauces === "one"}
                      onChange={() => setSelectedSauces("one")}
                      className="mr-3"
                    />
                    <span className="text-gray-700">Uma Calda <span className="text-green-600 font-semibold">+R$ 0,00</span></span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sauces"
                      value="two"
                      checked={selectedSauces === "two"}
                      onChange={() => setSelectedSauces("two")}
                      className="mr-3"
                    />
                    <span className="text-gray-700">Duas Caldas <span className="text-orange-600 font-semibold">+R$ 0,00</span></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Opções de Customização para Shakes Proteicos */}
          {isShakeProteico && (
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-black">Escolha seu Leite</h3>

              {/* Opção de Leite */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Tipo de Leite</p>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="milk"
                      value="normal"
                      checked={selectedMilk === "normal"}
                      onChange={() => setSelectedMilk("normal")}
                      className="mr-3"
                    />
                    <span className="text-gray-700">Desnatado <span className="text-green-600 font-semibold">+R$ 0,00</span></span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="milk"
                      value="zero"
                      checked={selectedMilk === "zero"}
                      onChange={() => setSelectedMilk("zero")}
                      className="mr-3"
                    />
                    <span className="text-gray-700">Zero Lactose <span className="text-orange-600 font-semibold">+R$ 2,00</span></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Preço */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Preço Total</p>
            <p className="text-2xl font-bold text-black">R$ {calculatePrice().toFixed(2)}</p>
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

          {/* Botão Adicionar */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            Adicionar ao Carrinho - R$ {calculatePrice().toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
