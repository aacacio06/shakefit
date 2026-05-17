export default function AboutSection() {
  const stats = [
    { number: "500+", label: "Clientes Satisfeitos" },
    { number: "30+", label: "Produtos no Cardápio" },
    { number: "100%", label: "Ingredientes Selecionados" },
    { number: "5★", label: "Avaliação Média" },
  ];

  return (
    <section id="sobre" className="bg-[#1a1a1a] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">
            SOBRE NÓS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            A Nossa História
          </h2>
        </div>

        {/* Descrição */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            De onde viemos, o que criamos e para onde vamos. A Shake Fit nasceu da paixão por unir sabor e saúde em cada refeição.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Criamos para você escolher entre nossas opções com descrição e fotos, para que cada pedido seja uma experiência consciente e deliciosa. Nosso compromisso é oferecer produtos que nutrem o corpo sem abrir mão do prazer.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-yellow-400 font-bold text-3xl sm:text-4xl mb-2">
                {stat.number}
              </p>
              <p className="text-gray-400 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
