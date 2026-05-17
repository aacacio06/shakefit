import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden pt-16"
      style={{
        backgroundImage: "url('/manus-storage/correto-01_147e704c.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-block bg-white text-black px-6 py-2 rounded-full mb-8 text-sm font-semibold">
          Sabor + Saúde + Performance
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Shake Fit: Seu Sabor, Sua Versão Mais Saudável.
        </h1>

        {/* Subtítulo */}
        <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
          Shakes Proteicos de Alto Padrão, Waffles Gourmet, Bebidas Funcionais e Mais.
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/5569992058071" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors font-semibold flex items-center justify-center gap-2 border border-gray-700">
            Peça Agora e Transforme seu Dia
            <ArrowRight size={20} />
          </a>
          <a href="#cardapio" className="bg-transparent text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors font-semibold border-2 border-yellow-400">
            Ver Cardápio
          </a>
        </div>
      </div>
    </section>
  );
}
