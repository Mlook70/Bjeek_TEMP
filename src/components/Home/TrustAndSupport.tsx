import React from 'react';
import Image from 'next/image';
import '@/styles/animations.css';

interface TrustElement {
  title: string;
  description: string;
}

interface MessagesType {
  trust: {
    title: string;
    elements: TrustElement[];
  };
}

interface TrustAndSupportProps {
  messages: MessagesType;
  locale?: string;
}

const TrustAndSupport = ({ messages, locale = 'en' }: TrustAndSupportProps) => {

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-relaxed animate-fade-in-up delay-300 hardware-accelerate"
            style={{
              lineHeight: '1.3',
              paddingTop: '0.15em',
              paddingBottom: '0.25em',
              minHeight: 'fit-content'
            }}
          >
            {messages.trust.title}
          </h2>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* About Us Image */}
          <div className="relative animate-fade-in-scale delay-500 hardware-accelerate">
            {/* Spotlight Effect from Bottom */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120%] h-32 bg-gradient-to-t from-brand-green/20 via-brand-green/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-20 bg-gradient-to-t from-brand-green/30 via-brand-green/15 to-transparent rounded-full blur-xl"></div>
            
            <div className="relative z-10 max-w-md mx-auto">
              <Image
                src="/aboutUs.png"
                alt={locale === 'ar' ? 'من نحن - بجيك' : 'About Us - Bjeek'}
                width={400}
                height={300}
                className="w-full h-auto object-contain rounded-2xl"
                priority
              />
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute top-8 right-8 w-3 h-3 bg-brand-green rounded-full shadow-lg shadow-brand-green/50 animate-pulse"></div>
            <div className="absolute bottom-12 left-8 w-2 h-2 bg-brand-green rounded-full shadow-lg shadow-brand-green/50 animate-pulse delay-500"></div>
          </div>

          {/* Trust Elements - 2 cards per row with equal heights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
            {messages.trust.elements.map((element, idx) => (
              <div
                key={idx}
                className="group relative cursor-pointer h-full animate-fade-in-up hardware-accelerate"
                style={{ animationDelay: `${600 + idx * 200}ms` }}
              >
                {/* Main Card - Full height */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 h-full transition-all duration-500 ease-out hover:border-brand-green/50 hover:shadow-xl hover:shadow-brand-green/10 hover:scale-105 hover:-translate-y-1">
                  
                  {/* Dynamic Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content - Full height with flex layout */}
                  <div className="relative p-6 lg:p-8 h-full flex flex-col">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-light text-white mb-4 tracking-wide flex items-center gap-3">
                      <div className="w-3 h-3 bg-brand-green rounded-full shadow-lg shadow-brand-green/50"></div>
                      {element.title}
                    </h3>

                    {/* Description - Takes remaining space */}
                    <p className="text-white/80 text-lg md:text-xl lg:text-2xl leading-relaxed font-light flex-grow">
                      {element.description}
                    </p>
                  </div>

                  {/* Luxury Border Animation */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-green to-brand-green opacity-20 blur-sm"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-brand-green/50 to-transparent animate-scale-x delay-1200 hardware-accelerate"></div>
      </div>
    </section>
  );
};

export default TrustAndSupport;