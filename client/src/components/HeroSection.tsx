import { useState, useEffect } from 'react';
import { Carousel } from './Carousel';

export default function HeroSection() {
  const carouselImages = [
    '/manus-storage/WhatsAppImage2026-05-18at21.46.53_cc2bfee9.jpeg',
    '/manus-storage/WhatsAppImage2026-05-16at15.25.03(8)_185020c1.jpeg',
    '/manus-storage/pasted_file_cOlFoP_image_e6a0d1a2.png',
  ];

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

      <div className="relative w-full">
        <Carousel images={carouselImages} interval={1500} autoPlay={true} />
      </div>
    </section>
  );
}
