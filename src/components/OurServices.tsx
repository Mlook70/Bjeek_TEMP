'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { getMessages } from '@/i18n';
import Image from 'next/image';

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
}

const OurServices: React.FC<OurServicesProps> = ({ messages }) => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const locale = useLocale();

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: messages.services.ride.title,
      image: '/car.jpg',
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
      image: '/food.jpg',
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
      image: '/shop.png',
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
      image: '/ship.png',
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-[#41fc95] to-white mb-6 leading-relaxed"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {messages.services.servicesTitle}
          </motion.h2>
          
          <motion.p 
            className="text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-4xl mx-auto leading-relaxed font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {messages.services.subtitle}
          </motion.p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 1, 
                delay: idx * 0.15,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true }}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredService(idx)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => setSelectedService(selectedService === idx ? null : idx)}
            >
              {/* Main Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 transition-all duration-700 group-hover:border-[#00b14f]/50 group-hover:shadow-2xl group-hover:shadow-[#00b14f]/10">
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>
                
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                  <Image  
                    src={service.image}
                    alt={service.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <motion.div
                    className={`absolute top-6 ${locale === 'ar' ? 'left-6' : 'right-6'} p-3 bg-[#00b14f]/20 backdrop-blur-md rounded-2xl border border-white/20 text-white`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <motion.h3 
                    className="text-xl md:text-2xl font-light text-white mb-4"
                    initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {service.title}
                  </motion.h3>



                  {/* Features List */}
                  <AnimatePresence>
                    {selectedService === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="space-y-3 mb-6"
                      >
                        {service.features.map((feature: string, i: number) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className={`w-2 h-2 rounded-full ${service.accent} shadow-lg flex-shrink-0`}></div>
                            <span className="text-white/80 text-lg md:text-xl lg:text-2xl font-light">{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* More Button */}
                  <motion.button
                    className="group/btn relative inline-flex items-center px-6 py-3 text-lg md:text-xl font-medium text-[#00b14f] hover:text-white transition-all duration-300 rounded-full border border-[#00b14f]/30 hover:border-[#00b14f] hover:bg-[#00b14f]/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(selectedService === idx ? null : idx);
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {selectedService === idx ? messages.buttons.close : messages.buttons.more}
                      <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${selectedService === idx ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </motion.button>
                </div>

                {/* Luxury Border Animation */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00b14f]/20 via-transparent to-[#00b14f]/20 blur-sm"></div>
                </div>

                {/* Animated Corner Dot */}
                <AnimatePresence>
                  {hoveredService === idx && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className={`absolute top-6 ${locale === 'ar' ? 'right-6' : 'left-6'}`}
                    >
                      <div className="w-3 h-3 bg-[#00b14f] rounded-full animate-pulse shadow-lg shadow-[#00b14f]/50"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;