import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage((prev) => !prev);
    }, 6000); // 3 segundos de imagem + 3 segundos de frase

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-white flex items-center justify-center py-4 sm:py-6 overflow-hidden">
      <style>{`
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .slide-out {
          animation: slideOutRight 1s ease-in-out forwards;
        }

        .slide-in {
          animation: slideInLeft 1s ease-in-out forwards;
        }
      `}</style>

      <div className="relative flex items-center justify-center max-w-full w-full">
        {showImage ? (
          <div className="slide-in relative w-full flex items-center justify-center">
            <img
              src="/manus-storage/WhatsAppImage2026-05-18at21.46.53_cc2bfee9.jpeg"
              alt="Shake Fit"
              className="max-w-full h-auto"
            />
          </div>
        ) : (
          <div className="slide-in w-full flex items-center justify-center min-h-96 bg-gradient-to-br from-teal-50 to-orange-50">
            <div className="text-center px-6 py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                <span className="text-teal-600">Energia</span>,{' '}
                <span className="text-orange-400">aconchego</span> e{' '}
                <span className="text-teal-600">alimentação saudável</span> em um só lugar.
              </h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
