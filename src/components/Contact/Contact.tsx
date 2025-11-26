'use client'
import React from 'react';
import { useTranslations } from 'next-intl';
import { FaWhatsapp } from 'react-icons/fa';
import '@/styles/animations.css';
import Link from 'next/link';

const WHATSAPP_NUMBER = "966561482760"; // Same number from WhatsAppFloatingButton

const Contact: React.FC = () => {
  const t = useTranslations('contact');

  return (
    <div className="h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">

      {/* Background Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          {/* <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-green to-white mb-6 leading-relaxed animate-fade-in-scale delay-300 hardware-accelerate"
          >
            {t('title')}
          </h1> */}
          
          <p 
            className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up delay-500 hardware-accelerate"
          >
            {t('message')}
          </p>

          {/* Brand Line */}
          <div 
            className="w-24 h-1.5 bg-brand-green mx-auto rounded-full animate-scale-x delay-700 hardware-accelerate"
          />
        </div>

        {/* WhatsApp Contact Card */}
        <div className="animate-fade-in-up delay-800 hardware-accelerate">
            <div className="relative z-10">
              {/* CTA Button */}
              <div className="flex justify-center">
                <Link
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-brand-green to-brand-green/60 hover:from-brand-green/70 text-white font-semibold px-10 py-5 rounded-lg text-lg md:text-xl shadow-xl"
                >
                  <FaWhatsapp size={28} />
                  <span>{t('whatsappButton')}</span>
                </Link>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-brand-green rounded-full shadow-lg shadow-brand-green/50 animate-pulse delay-500"></div>
            <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-brand-green rounded-full shadow-lg shadow-brand-green/50 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-4 w-1 h-1 bg-brand-green rounded-full shadow-lg shadow-brand-green/50 animate-pulse delay-700"></div>
            <div className="absolute top-1/2 right-4 w-1 h-1 bg-brand-green rounded-full shadow-lg shadow-brand-green/50 animate-pulse delay-1200"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

