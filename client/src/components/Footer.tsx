import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    "Cardápio Principal",
    "Shake Gourmet",
    "Slim Day",
    "Sobre Nós",
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Instagram, label: "Instagram" },
    { icon: Twitter, label: "Twitter" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div className="md:col-span-1">
            <h3 className="text-black font-bold text-xl mb-2">ShakeFit</h3>
            <p className="text-gray-600 text-sm">
              Seu sabor, sua versão mais saudável. Nutrição com prazer em cada mordida.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-black font-bold mb-4 uppercase text-sm">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-black font-bold mb-4 uppercase text-sm">Contato</h4>
            <div className="space-y-2 text-gray-600 text-sm">
              <p>Restaurante de comida saudável</p>
              <p className="font-semibold text-black mt-2">Horário de Atendimento:</p>
              <p>Seg-Sex: 7:00 às 19:30</p>
              <p>Sáb: 7:00 às 11:30</p>
              <p>Dom: 7:00 às 10:30</p>
              <p className="font-semibold text-black mt-2">WhatsApp:</p>
              <a href="https://wa.me/5569992058071" className="text-black hover:text-gray-700 transition-colors font-semibold">+55 69 99920-5807</a>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-black font-bold mb-4 uppercase text-sm">Redes Sociais</h4>
            <p className="text-gray-600 text-sm mb-4">
              Siga-nos e fique por dentro das novidades!
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/shakefitopo"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/5569992058071"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="WhatsApp"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-200 pt-8">
          {/* Copyright */}
          <div className="text-center mb-4">
            <p className="text-gray-600 text-sm">
              © 2026 Shake Fit. Todos os direitos reservados.
            </p>
          </div>

          {/* Tagline */}
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              Feito com cuidado para sua saúde
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
