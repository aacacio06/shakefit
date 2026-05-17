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
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-xl mb-2">ShakeFit</h3>
            <p className="text-gray-400 text-sm">
              Seu sabor, sua versão mais saudável. Nutrição com prazer em cada mordida.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm">Contato</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>Centro, Cidade - Estado</p>
              <p>Seg-Sáb: 8h às 20h</p>
              <p className="font-semibold text-white">(00) 00000-0000</p>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm">Redes Sociais</h4>
            <p className="text-gray-400 text-sm mb-4">
              Siga-nos e fique por dentro das novidades!
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-800 pt-8">
          {/* Copyright */}
          <div className="text-center mb-4">
            <p className="text-gray-400 text-sm">
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
