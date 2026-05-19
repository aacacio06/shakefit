export default function HeroSection() {
  return (
    <section className="relative w-full bg-white flex items-center justify-center py-4 sm:py-6">
      <div className="relative flex items-center justify-center max-w-full">
        <img
          src="/manus-storage/WhatsAppImage2026-05-18at21.46.53_cc2bfee9.jpeg"
          alt="Shake Fit"
          className="max-w-full h-auto"
        />
        <a
          href="#cardapio"
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors font-semibold text-sm sm:text-base"
        >
          Ver Cardápio
        </a>
      </div>
    </section>
  );
}
