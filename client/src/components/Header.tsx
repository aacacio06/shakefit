import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  onCartClick?: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();

  const navLinks = [
    { label: "Cardápio", href: "#cardapio" },
    { label: "Monte seu Shake", href: "#monte-seu" },
    { label: "Slim Day", href: "#slim-day" },
  ];

  const mobileMenuLinks = [
    ...navLinks,
    { label: "Sobre", href: "#sobre" },
    { label: "Missão", href: "#missao" },
    { label: "Visão", href: "#visao" },
    { label: "Valores", href: "#valores" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="#" className="text-black text-2xl font-bold">
              ShakeFit
            </a>
            <img
              src="/manus-storage/WhatsAppImage2026-05-16at15.24.59(3)_2cffebb0.jpeg"
              alt="Shake Fit Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="text-gray-600 hover:text-black relative"
            >
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
            <a href="https://wa.me/5569992058071" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium border border-black inline-block">
              Faça seu Pedido Online
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="text-gray-600 hover:text-black relative"
            >
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-black"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 bg-white">
            {mobileMenuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-gray-600 hover:text-black px-2 py-2 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="https://wa.me/5569992058071" target="_blank" rel="noopener noreferrer" className="w-full mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium border border-black block text-center">
              Faça seu Pedido Online
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
