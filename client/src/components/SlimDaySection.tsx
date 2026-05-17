export default function SlimDaySection() {
  const benefits = [
    "5 refeições completas",
    "Shakes concentrados",
    "Chás energizantes",
    "Bolo de pote fit",
    "Sopas nutritivas",
    "Colágeno hidrolisado",
  ];

  return (
    <section id="slim-day" className="bg-black py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">
            Detox e Bem-Estar
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Slim Day: 24h para Desintoxicar e Eliminar 2kg.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Um programa completo de 24 horas com refeições balanceadas, shakes, chás e suplementos para uma desintoxicação eficaz e saudável.
          </p>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Benefícios */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm">✓</span>
                </div>
                <span className="text-white text-lg">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Card de Compra */}
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-white font-bold text-2xl mb-4">Pacote Completo</h3>
              <span className="text-yellow-400 font-bold text-4xl">R$ 159,00</span>
            </div>

            <button className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors font-bold mb-6 text-lg">
              Quero meu Slim Day
            </button>

            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Resultados em</p>
              <p className="text-white font-bold text-3xl">24h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
