import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, X, Minus, Plus, User, Phone, ArrowRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

// Contexto para passar dados do cliente para a página Pix
export interface CustomerInfo {
  name: string;
  phone: string;
}

// Armazenar info do cliente em sessionStorage para a página Pix acessar
export function getCustomerInfo(): CustomerInfo | null {
  try {
    const data = sessionStorage.getItem("shakefit_customer");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveCustomerInfo(info: CustomerInfo) {
  sessionStorage.setItem("shakefit_customer", JSON.stringify(info));
}

type CartStep = "items" | "customer";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<CartStep>("items");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [, setLocation] = useLocation();

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const digits = value.replace(/\D/g, "");
    // Formata como (XX) XXXXX-XXXX
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 11)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleOpenCart = () => {
    setStep("items");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep("items");
  };

  const handleGoToCustomer = () => {
    if (items.length === 0) {
      toast.error("Carrinho vazio!");
      return;
    }
    setStep("customer");
  };

  const handleCheckout = () => {
    if (!name.trim()) {
      toast.error("Por favor, informe seu nome.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      toast.error("Por favor, informe um telefone válido.");
      return;
    }
    // Salvar dados do cliente para a página Pix usar
    saveCustomerInfo({ name: name.trim(), phone });
    setIsOpen(false);
    setStep("items");
    setLocation("/pagamento/pix");
  };

  return (
    <>
      {/* Botão Flutuante do Carrinho */}
      <button
        onClick={handleOpenCart}
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

            {/* ── ETAPA 1: ITENS ── */}
            {step === "items" && (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-black">Carrinho</h2>
                  <button
                    onClick={handleClose}
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
                    items.map((item) => (
                      <div
                        key={`${item.product.id}-${JSON.stringify(item.customizations)}`}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-black">{item.product.name}</h3>
                          <button
                            onClick={() => removeItem(item.product.id, item.customizations)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <X size={16} className="text-red-500" />
                          </button>
                        </div>

                        {item.customizations && (
                          <div className="text-xs text-gray-600 mb-3 space-y-1">
                            {item.customizations.milk && <p>• Leite: {item.customizations.milk}</p>}
                            {item.customizations.sauces && <p>• Caldas: {item.customizations.sauces}</p>}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.customizations)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Minus size={16} className="text-black" />
                            </button>
                            <span className="font-bold text-black w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.customizations)}
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
                    <div className="flex items-center justify-between text-lg font-bold text-black">
                      <span>Total:</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={handleGoToCustomer}
                        className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Finalizar Pedido</span>
                        <ArrowRight size={18} />
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
              </>
            )}

            {/* ── ETAPA 2: DADOS DO CLIENTE ── */}
            {step === "customer" && (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center gap-3">
                  <button
                    onClick={() => setStep("items")}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={22} className="text-black" />
                  </button>
                  <h2 className="text-xl font-bold text-black">Seus Dados</h2>
                  <button
                    onClick={handleClose}
                    className="ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={22} className="text-black" />
                  </button>
                </div>

                {/* Formulário */}
                <div className="flex-1 p-6 space-y-5">
                  {/* Resumo do pedido */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Resumo</p>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <div
                          key={`${item.product.id}-${JSON.stringify(item.customizations)}`}
                          className="flex justify-between text-sm text-gray-700"
                        >
                          <span>{item.product.name} x{item.quantity}</span>
                          <span className="font-semibold">R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold text-black">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Campo Nome */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Nome completo <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Ex: Maria Silva"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Campo Telefone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Telefone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="(69) 99999-9999"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={15}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <p className="text-xs text-gray-400">Usaremos para confirmar seu pedido.</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-base hover:bg-green-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Ir para o Pagamento Pix</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}
