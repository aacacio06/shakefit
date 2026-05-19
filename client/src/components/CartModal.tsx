import { useCart } from "@/contexts/CartContext";
import { X, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    onClose();
    setLocation("/pagamento/pix");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#1a1a1a] shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-white font-bold text-lg">Seu Carrinho</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              Seu carrinho está vazio
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-gray-900 rounded-lg p-4 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      R$ {item.product.price.toFixed(2)} x {item.quantity}
                    </p>
                    <p className="text-yellow-400 font-bold mt-2">
                      R${" "}
                      {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1
                        )
                      }
                      className="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="text-white w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1
                        )
                      }
                      className="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-800 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total:</span>
              <span className="text-yellow-400 font-bold text-xl">
                R$ {total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Finalizar Pedido
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-gray-800 text-gray-300 font-semibold py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Limpar Carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
