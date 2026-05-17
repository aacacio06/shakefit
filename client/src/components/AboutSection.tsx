export default function AboutSection() {
  const stats = [
    { number: "500+", label: "Clientes Satisfeitos" },
    { number: "30+", label: "Produtos no Cardápio" },
    { number: "100%", label: "Ingredientes Selecionados" },
    { number: "5★", label: "Avaliação Média" },
  ];

  const values = [
    {
      title: "Qualidade",
      description: "Compromisso com ingredientes premium e excelência em cada produto.",
    },
    {
      title: "Inovação",
      description: "Constantemente buscamos novas receitas e formas de surpreender nossos clientes.",
    },
    {
      title: "Saúde",
      description: "Priorizamos o bem-estar e a nutrição em cada decisão que tomamos.",
    },
    {
      title: "Satisfação",
      description: "A felicidade de nossos clientes é nossa maior recompensa.",
    },
  ];

  return (
    <>
      {/* Seção Sobre */}
      <section id="sobre" className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">
              SOBRE NÓS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              A Nossa História
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              De onde viemos, o que criamos e para onde vamos. A Shake Fit nasceu da paixão por unir sabor e saúde em cada refeição.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Criamos para você escolher entre nossas opções com descrição e fotos, para que cada pedido seja uma experiência consciente e deliciosa. Nosso compromisso é oferecer produtos que nutrem o corpo sem abrir mão do prazer.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-yellow-600 font-bold text-3xl sm:text-4xl mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Missão */}
      <section id="missao" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">
              NOSSA MISSÃO
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
              Transformar Vidas com Sabor e Saúde
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
              Oferecer shakes e bebidas funcionais de alta qualidade que combinam sabor gourmet com benefícios nutricionais, permitindo que nossos clientes alcancem seus objetivos de saúde sem abrir mão do prazer.
            </p>
          </div>
        </div>
      </section>

      {/* Seção Visão */}
      <section id="visao" className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">
              NOSSA VISÃO
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
              Ser a Marca Referência em Bem-Estar
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
              Ser reconhecida como a marca líder em shakes e bebidas funcionais, inspirando pessoas a viverem vidas mais saudáveis e conscientes através de produtos inovadores e de excelente qualidade.
            </p>
          </div>
        </div>
      </section>

      {/* Seção Valores */}
      <section id="valores" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">
              NOSSOS VALORES
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black">
              O que nos guia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
                <h3 className="text-yellow-600 font-bold text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
