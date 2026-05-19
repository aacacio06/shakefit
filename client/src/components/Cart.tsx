import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Carrinho vazio!");
      return;
    }
    setIsOpen(false);
    setLocation("/pagamento/pix");
  };

  const handleWhatsApp = () => {
    if (items.length === 0) {
      toast.error("Carrinho vazio!");
      return;
    }

    // Construir mensagem do pedido
    let message = "🛒 *Novo Pedido - Shake Fit Gourmet*\n\n";
    message += "*Itens:*\n";

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (x${item.quantity})`;

      // Adicionar customizações se existirem
      if (item.customizations) {
        if (item.customizations.milk) {
          message += `\n   • Leite: ${item.customizations.milk}`;
        }
        if (item.customizations.sauces) {
          message += `\n   • Caldas: ${item.customizations.sauces}`;
        }
      }

      message += `\n   R$ ${item.product.price.toFixed(2)}\n`;
    });

    message += `\n*Total: R$ ${total.toFixed(2)}*\n`;
    message += "\n_Obrigado por escolher Shake Fit Gourmet!_";

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5569992058071?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank");
    
    // Limpar carrinho após envio
    clearCart();
    setIsOpen(false);
    toast.success("Pedido enviado para WhatsApp!");
  };

  return (
    <>
      {/* Botão Flutuante do Carrinho */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all z-40 flex items-center justify-center"
      >
        <ShoppingCart size={24} />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Painel do Carrinho */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md rounded-t-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black">Carrinho</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-black" />
              </button>
            </div>

            {/* Itens */}
            <div className="flex-1 p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <ShoppingCart size={48} className="mb-4 opacity-50" />
                  <p className="text-center">Seu carrinho está vazio</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${JSON.stringify(item.customizations)}`}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    {/* Nome do Produto */}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-black">{item.product.name}</h3>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.customizations)
                        }
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>

                    {/* Customizações */}
                    {item.customizations && (
                      <div className="text-xs text-gray-600 mb-3 space-y-1">
                        {item.customizations.milk && (
                          <p>• Leite: {item.customizations.milk}</p>
                        )}
                        {item.customizations.sauces && (
                          <p>• Caldas: {item.customizations.sauces}</p>
                        )}
                      </div>
                    )}

                    {/* Quantidade e Preço */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.customizations
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Minus size={16} className="text-black" />
                        </button>
                        <span className="font-bold text-black w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.customizations
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Plus size={16} className="text-black" />
                        </button>
                      </div>
                      <span className="font-bold text-black">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between text-lg font-bold text-black">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>

                {/* Botões */}
                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Finalizar Pedido</span>
                  </button>
                  <button
                    onClick={() => clearCart()}
                    className="w-full bg-gray-200 text-black py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
