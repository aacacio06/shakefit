import { ChevronRight } from "lucide-react";

export default function CustomizeSection() {
  const steps = [
    "Shake Tópissimo",
    "Escolha seu Leite",
    "Escolha seus Sabores",
    "Escolha sua Trufa/Borda",
  ];

  return (
    <section id="monte-seu" className="bg-[#1a1a1a] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">
            MONTE O SEU
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Seu Shake, Sua Regra.
          </h2>
          <p className="text-gray-400 text-lg">
            Crie seu Pedido em 4 Passos.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center items-center">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2 sm:gap-4">
                <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium whitespace-nowrap">
                  {step}
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight className="text-gray-600 hidden sm:block" size={20} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Produto Card */}
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg overflow-hidden">
          <div className="h-64 bg-gray-800 flex items-center justify-center">
            <img
              src="https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png"
              alt="Shake Tópissimo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <h3 className="text-white font-bold text-2xl mb-2">Shake Tópissimo</h3>
            <p className="text-gray-400 mb-6">
              Sabor à escolha + Waffle Quentinho incluso
            </p>

            <div className="flex items-center justify-between mb-6">
              <span className="text-yellow-400 font-bold text-2xl">R$ 69,00</span>
            </div>

            <a href="https://wa.me/5569992058071" target="_blank" rel="noopener noreferrer" className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors font-bold mb-4 block text-center">
              Começar Personalização
            </a>

            <div className="flex items-center justify-between text-gray-400 text-sm">
              <span>Total estimado</span>
              <span className="text-yellow-400 font-bold text-lg">R$ 69,00</span>
            </div>

            <button className="w-full mt-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
