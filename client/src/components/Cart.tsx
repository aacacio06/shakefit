import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, X, Minus, Plus, User, Phone, ArrowRight, ChevronLeft, MapPin, Home, Utensils } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

// Contexto para passar dados do cliente para a página Pix
export interface DeliveryOption {
  type: "delivery" | "pickup" | "consume";
  address?: string;
  neighborhood?: string;
  number?: string;
  complement?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  delivery: DeliveryOption;
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

type CartStep = "items" | "customer" | "delivery";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<CartStep>("items");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup" | "consume">("pickup");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [, setLocation] = useLocation();

  const DELIVERY_FEE = 7;
  const deliveryTotal = deliveryType === "delivery" ? total + DELIVERY_FEE : total;

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
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

  const handleGoToDelivery = () => {
    if (!name.trim()) {
      toast.error("Por favor, informe seu nome.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      toast.error("Por favor, informe um telefone válido.");
      return;
    }
    setStep("delivery");
  };

  const handleCheckout = () => {
    if (deliveryType === "delivery") {
      if (!address.trim()) {
        toast.error("Por favor, informe o endereço.");
        return;
      }
      if (!neighborhood.trim()) {
        toast.error("Por favor, informe o bairro.");
        return;
      }
      if (!number.trim()) {
        toast.error("Por favor, informe o número.");
        return;
      }
    }

    const customerData: CustomerInfo = {
      name: name.trim(),
      phone,
      delivery: {
        type: deliveryType,
        ...(deliveryType === "delivery" && {
          address: address.trim(),
          neighborhood: neighborhood.trim(),
          number: number.trim(),
          complement: complement.trim(),
        }),
      },
    };

    saveCustomerInfo(customerData);
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
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-black">Carrinho</h2>
                  <button
                    onClick={handleClose}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-black" />
                  </button>
                </div>

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

                <div className="flex-1 p-6 space-y-5">
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
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                  <button
                    onClick={handleGoToDelivery}
                    className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-base hover:bg-green-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Escolher Entrega</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </>
            )}

            {/* ── ETAPA 3: OPÇÕES DE ENTREGA ── */}
            {step === "delivery" && (
              <>
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center gap-3">
                  <button
                    onClick={() => setStep("customer")}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={22} className="text-black" />
                  </button>
                  <h2 className="text-xl font-bold text-black">Como Receber?</h2>
                  <button
                    onClick={handleClose}
                    className="ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={22} className="text-black" />
                  </button>
                </div>

                <div className="flex-1 p-6 space-y-4">
                  {/* Opção 1: Consumir no Local */}
                  <button
                    onClick={() => setDeliveryType("consume")}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                      deliveryType === "consume"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${deliveryType === "consume" ? "bg-green-500" : "bg-gray-100"}`}>
                      <Utensils size={20} className={deliveryType === "consume" ? "text-white" : "text-gray-600"} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold text-black">Consumir no Local</p>
                      <p className="text-sm text-gray-600">Aproveite na nossa loja</p>
                      <p className="text-sm font-bold text-green-600 mt-1">R$ {total.toFixed(2)}</p>
                    </div>
                  </button>

                  {/* Opção 2: Retirar no Local */}
                  <button
                    onClick={() => setDeliveryType("pickup")}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                      deliveryType === "pickup"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${deliveryType === "pickup" ? "bg-blue-500" : "bg-gray-100"}`}>
                      <MapPin size={20} className={deliveryType === "pickup" ? "text-white" : "text-gray-600"} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold text-black">Retirar no Local</p>
                      <p className="text-sm text-gray-600">Busque quando quiser</p>
                      <p className="text-sm font-bold text-blue-600 mt-1">R$ {total.toFixed(2)}</p>
                    </div>
                  </button>

                  {/* Opção 3: Entrega em Casa */}
                  <button
                    onClick={() => setDeliveryType("delivery")}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                      deliveryType === "delivery"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${deliveryType === "delivery" ? "bg-orange-500" : "bg-gray-100"}`}>
                      <Home size={20} className={deliveryType === "delivery" ? "text-white" : "text-gray-600"} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-bold text-black">Entrega em Casa</p>
                      <p className="text-sm text-gray-600">Receba em seu endereço</p>
                      <p className="text-sm font-bold text-orange-600 mt-1">R$ {(total + DELIVERY_FEE).toFixed(2)}</p>
                      <p className="text-xs text-orange-500 mt-1">+R$ {DELIVERY_FEE.toFixed(2)} de taxa</p>
                    </div>
                  </button>

                  {/* Campos de Endereço (aparecem apenas se escolher entrega) */}
                  {deliveryType === "delivery" && (
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                      <h3 className="font-bold text-black">Endereço de Entrega</h3>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Rua / Avenida <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Rua das Flores"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Número <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: 123"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Bairro <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Centro"
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Complemento (opcional)
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Apto 101, próximo ao banco"
                          value={complement}
                          onChange={(e) => setComplement(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Resumo Final */}
                  <div className="mt-6 pt-6 border-t border-gray-200 bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-semibold text-black">R$ {total.toFixed(2)}</span>
                    </div>
                    {deliveryType === "delivery" && (
                      <div className="flex justify-between items-center mb-2 text-orange-600">
                        <span>Taxa de Entrega</span>
                        <span className="font-semibold">+R$ {DELIVERY_FEE.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                      <span className="font-bold text-black">Total</span>
                      <span className="font-bold text-lg text-green-600">R$ {deliveryTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

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
