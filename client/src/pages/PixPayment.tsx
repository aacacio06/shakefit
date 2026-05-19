import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useLocation } from "wouter";
import { CheckCircle, Copy, Check, ArrowLeft, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const PIX_KEY = "CHAVE_PIX_AQUI"; // Substituir pela chave Pix real
const QR_CODE_IMAGE = "/manus-storage/WhatsAppImage2026-05-18at23.22.41_daf7039c.jpeg";
const WHATSAPP_NUMBER = "5569992058071";

export default function PixPayment() {
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      toast.success("Chave Pix copiada!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Não foi possível copiar. Copie manualmente.");
    }
  };

  const buildWhatsAppMessage = () => {
    let message = "🛒 *Pedido Shake Fit Gourmet*\n\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n";

    items.forEach((item) => {
      message += `▸ *${item.product.name}* x${item.quantity}\n`;
      if (item.customizations?.milk) {
        message += `   Leite: ${item.customizations.milk}\n`;
      }
      if (item.customizations?.sauces) {
        message += `   Caldas: ${item.customizations.sauces}\n`;
      }
      if (item.customizations?.flavors && item.customizations.flavors.length > 0) {
        message += `   Sabores: ${item.customizations.flavors.join(", ")}\n`;
      }
      if (item.customizations?.additionals && item.customizations.additionals.length > 0) {
        message += `   Adicionais: ${item.customizations.additionals.join(", ")}\n`;
      }
      message += `   💰 R$ ${(item.product.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += "━━━━━━━━━━━━━━━━━━━━\n";
    message += `💳 *Total: R$ ${total.toFixed(2)}*\n\n`;
    message += "✅ *Pagamento via Pix realizado!*\n";
    message += "Aguardando confirmação do pedido.";

    return encodeURIComponent(message);
  };

  const handlePaymentDone = () => {
    const message = buildWhatsAppMessage();
    clearCart();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setLocation("/");
  };

  if (items.length === 0) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Pagamento via Pix</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-6 space-y-6">

          {/* Resumo do Pedido */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-base">Resumo do Pedido</h2>
            </div>
            <div className="px-5 py-4 space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium text-sm">
                      {item.product.name} <span className="text-gray-500">x{item.quantity}</span>
                    </p>
                    {item.customizations?.milk && (
                      <p className="text-gray-400 text-xs">Leite: {item.customizations.milk}</p>
                    )}
                    {item.customizations?.sauces && (
                      <p className="text-gray-400 text-xs">Caldas: {item.customizations.sauces}</p>
                    )}
                  </div>
                  <span className="text-gray-900 font-semibold text-sm whitespace-nowrap">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-green-600">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <h2 className="font-bold text-gray-900 text-base">Escaneie o QR Code</h2>
            </div>
            <div className="px-5 py-6 flex flex-col items-center gap-4">
              {/* QR Code Container */}
              <div className="relative">
                <div className="w-56 h-56 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden flex items-center justify-center shadow-inner p-2">
                  <img
                    src={QR_CODE_IMAGE}
                    alt="QR Code Pix"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Cantos decorativos */}
                <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-green-500 rounded-tl-md" />
                <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-green-500 rounded-tr-md" />
                <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-green-500 rounded-bl-md" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-green-500 rounded-br-md" />
              </div>

              <div className="text-center">
                <p className="text-gray-500 text-sm">Abra o app do seu banco</p>
                <p className="text-gray-500 text-sm">e escaneie o código acima</p>
              </div>

              {/* Aviso de valor */}
              <div className="w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3 items-start">
                <span className="text-amber-500 text-lg mt-0.5">⚠️</span>
                <div>
                  <p className="text-amber-800 font-semibold text-sm">Insira o valor manualmente</p>
                  <p className="text-amber-700 text-xs mt-0.5">
                    Digite <span className="font-bold">R$ {total.toFixed(2)}</span> no campo de valor do seu banco ao realizar o pagamento.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chave Pix */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <h2 className="font-bold text-gray-900 text-base">Ou copie a chave Pix</h2>
            </div>
            <div className="px-5 py-5">
              <p className="text-gray-500 text-xs mb-3">
                Abra o app do seu banco → Pix → Pagar → Copia e Cola
              </p>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-sm text-gray-700 truncate">
                  {PIX_KEY}
                </div>
                <button
                  onClick={handleCopyPix}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-gray-900 text-white hover:bg-gray-700"
                  }`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
          </div>

          {/* Instrução final */}
          <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={18} className="text-green-600" />
              <p className="font-bold text-green-800 text-sm">Após realizar o pagamento</p>
            </div>
            <p className="text-green-700 text-xs leading-relaxed">
              Clique no botão abaixo para confirmar seu pedido via WhatsApp. Enviaremos todos os detalhes do seu pedido automaticamente.
            </p>
          </div>

        </div>
      </div>

      {/* Botão Fixo no Rodapé */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
        <button
          onClick={handlePaymentDone}
          className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all duration-150 flex items-center justify-center gap-3 text-base shadow-md"
        >
          <MessageCircle size={22} />
          Realizei o Pagamento — Confirmar Pedido
        </button>
        <p className="text-center text-gray-400 text-xs mt-2">
          Você será redirecionado ao WhatsApp com os detalhes do pedido
        </p>
      </div>
    </div>
  );
}
