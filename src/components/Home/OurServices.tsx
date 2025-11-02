import React from 'react';
import Image from 'next/image';
import '@/styles/animations.css';

interface ServiceItem {
  title: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  bullet4: string;
}

interface MessagesType {
  services: {
    servicesTitle: string;
    subtitle: string;
    ride: ServiceItem;
    food: ServiceItem;
    express: ServiceItem;
    logistics: ServiceItem;
  };
  buttons: {
    more: string;
    close: string;
  };
}

interface OurServicesProps {
  messages: MessagesType;
  locale?: string;
}

const OurServices: React.FC<OurServicesProps> = ({ messages }) => {

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: messages.services.ride.title,
      image: '/bjeek-ride.jpg',
      features: [
        messages.services.ride.bullet1,
        messages.services.ride.bullet2,
        messages.services.ride.bullet3,
        messages.services.ride.bullet4
      ],
      color: 'from-[#00b14f] to-[#00b14f]',
      accent: 'bg-[#00b14f]'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: messages.services.food.title,
      image: '/bjeek-food.jpg',
      features: [
        messages.services.food.bullet1,
        messages.services.food.bullet2,
        messages.services.food.bullet3,
        messages.services.food.bullet4
      ],
      color: 'from-[#00b14f] to-[#00b14f]',
      accent: 'bg-[#00b14f]'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: messages.services.express.title,
      image: '/bjeek-market.jpg',
      features: [
        messages.services.express.bullet1,
        messages.services.express.bullet2,
        messages.services.express.bullet3,
        messages.services.express.bullet4
      ],
      color: 'from-[#00b14f] to-[#00b14f]',
      accent: 'bg-[#00b14f]'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
      title: messages.services.logistics.title,
      image: '/bjeek-logistic.jpg',
      features: [
        messages.services.logistics.bullet1,
        messages.services.logistics.bullet2,
        messages.services.logistics.bullet3,
        messages.services.logistics.bullet4
      ],
      color: 'from-[#00b14f] to-[#00b14f]',
      accent: 'bg-[#00b14f]'
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="our-services">
      {/* Remove the black background and keep it transparent */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-[#41fc95] to-white mb-6 leading-relaxed animate-fade-in-scale delay-300 hardware-accelerate"
          >
            {messages.services.servicesTitle}
          </h2>
          
          <p 
            className="text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-4xl mx-auto leading-relaxed font-semibold animate-fade-in-up delay-500 hardware-accelerate"
          >
            {messages.services.subtitle}
          </p>
        </div>
        
        {/* Services Grid - Smaller cards with 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group relative animate-fade-in-up hardware-accelerate"
              style={{ animationDelay: `${700 + idx * 150}ms` }}
            >
              {/* Main Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 transition-all duration-700 ease-out group-hover:border-[#00b14f]/50 group-hover:shadow-2xl group-hover:shadow-[#00b14f]/10">
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>
                
                {/* Image Section - Square 1:1 aspect ratio with Title Overlay */}
                <div className="relative aspect-square w-full overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-900 to-black">
                  <Image  
                    src={service.image}
                    alt={service.title}
                    width={1024}
                    height={1024}
                    className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                  />
                  
                  {/* Black Gradient from Bottom to Top */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  
                  {/* Title Overlaid on Image at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-xl md:text-2xl font-light text-white text-center">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Features Section - Hidden by default, shows on hover */}
                <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96">
                  <div className="p-6">
                    {/* Features List */}
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                          style={{ 
                            transitionDelay: `${i * 100}ms`,
                          }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${service.accent} shadow-lg flex-shrink-0`}></div>
                          <span className="text-white/80 text-sm md:text-base font-light">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* More Button */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                      <span className="group/btn relative inline-flex items-center px-4 py-2 text-sm md:text-base font-medium text-[#00b14f] hover:text-white transition-all duration-300 rounded-full border border-[#00b14f]/30 hover:border-[#00b14f] hover:bg-[#00b14f]/10 hover:scale-105 cursor-pointer">
                        <span className="relative z-10 flex items-center gap-2">
                          {messages.buttons.more}
                          <svg 
                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-y-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Luxury Border Animation */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00b14f]/20 via-transparent to-[#00b14f]/20 blur-sm"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      
      </div>
      <div className="absolute bottom-[-100px] left-0 right-0 h-56 sm:h-36 lg:h-48 bg-gradient-to-t from-green-500 to-transparent" />
    </section>
  );
};

export default OurServices;