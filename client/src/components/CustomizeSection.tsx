import { ChevronRight } from "lucide-react";

export default function CustomizeSection() {
  const steps = [
    "Shake Tópissimo",
    "Escolha seu Leite",
    "Escolha seus Sabores",
    "Escolha sua Trufa/Borda",
  ];

  return (
    <section id="monte-seu" className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <p className="text-black text-sm font-bold uppercase tracking-wider mb-2">
            MONTE O SEU
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Seu Shake, Sua Regra.
          </h2>
          <p className="text-gray-600 text-lg">
            Crie seu Pedido em 4 Passos.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center items-center">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2 sm:gap-4">
                <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium whitespace-nowrap border border-gray-300">
                  {step}
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight className="text-gray-400 hidden sm:block" size={20} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Produto Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="h-64 bg-gray-800 flex items-center justify-center">
            <img
              src="/manus-storage/WhatsAppImage2026-05-16at15.24.59(1)_d1e0e933.jpeg"
              alt="Shake Tópissimo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <h3 className="text-black font-bold text-2xl mb-2">Shake Tópissimo</h3>
            <p className="text-gray-600 mb-6">
              Sabor à escolha + Waffle Quentinho incluso
            </p>

            <a href="https://wa.me/5569992058071" target="_blank" rel="noopener noreferrer" className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-bold mb-4 block text-center">
              Começar Personalização
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
