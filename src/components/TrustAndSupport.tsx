'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import Image from 'next/image';

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
}

const TrustAndSupport = ({ messages }: TrustAndSupportProps) => {
  const [hoveredTrust, setHoveredTrust] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const locale = useLocale();

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-[#41fc95] to-white mb-6 leading-relaxed"
            style={{
              lineHeight: '1.3',
              paddingTop: '0.15em',
              paddingBottom: '0.25em',
              minHeight: 'fit-content'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {messages.trust.title}
          </motion.h2>
        </motion.div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* About Us Image */}
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Spotlight Effect from Bottom */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120%] h-32 bg-gradient-to-t from-[#00b14f]/20 via-[#00b14f]/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-20 bg-gradient-to-t from-[#00b14f]/30 via-[#00b14f]/15 to-transparent rounded-full blur-xl"></div>
            
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
            <div className="absolute top-8 right-8 w-3 h-3 bg-[#00b14f] rounded-full animate-pulse shadow-lg shadow-[#00b14f]/50"></div>
            <div className="absolute bottom-12 left-8 w-2 h-2 bg-[#00b14f] rounded-full animate-pulse shadow-lg shadow-[#00b14f]/50" style={{ animationDelay: '1s' }}></div>
          </motion.div>

          {/* Trust Elements - 2 cards per row with equal heights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
            {messages.trust.elements.map((element, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.2,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                viewport={{ once: true }}
                className="group relative cursor-pointer h-full"
                onMouseEnter={() => setHoveredTrust(idx)}
                onMouseLeave={() => setHoveredTrust(null)}
                onClick={() => setActiveCard(activeCard === idx ? null : idx)}
              >
                {/* Main Card - Full height */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-700 group-hover:border-[#00b14f]/50 group-hover:shadow-xl group-hover:shadow-[#00b14f]/10 h-full">
                  
                  {/* Dynamic Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Content - Full height with flex layout */}
                  <div className="relative p-6 lg:p-8 h-full flex flex-col">
                    {/* Title */}
                    <motion.h3 
                      className="text-xl md:text-2xl font-light text-white mb-4 tracking-wide flex items-center gap-3"
                      initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-3 h-3 bg-[#00b14f] rounded-full shadow-lg shadow-[#00b14f]/50"></div>
                      {element.title}
                    </motion.h3>

                    {/* Description - Takes remaining space */}
                    <motion.p 
                      className="text-white/80 text-lg md:text-xl lg:text-2xl leading-relaxed font-light flex-grow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      {element.description}
                    </motion.p>

                    {/* Floating Particles */}
                    <AnimatePresence>
                      {hoveredTrust === idx && (
                        <>
                          {[...Array(2)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 0, x: 0 }}
                              animate={{ 
                                opacity: [0, 1, 0], 
                                y: [-10, -30, -50],
                                x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
                              }}
                              exit={{ opacity: 0 }}
                              transition={{ 
                                duration: 1.5, 
                                delay: i * 0.3,
                                repeat: Infinity,
                                repeatDelay: 1
                              }}
                              className={`absolute bottom-6 ${locale === 'ar' ? 'right-6' : 'left-6'} w-1.5 h-1.5 rounded-full bg-green-500`}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Luxury Border Animation */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 opacity-20 blur-sm"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          viewport={{ once: true }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-[#00b14f]/50 to-transparent"
        ></motion.div>
      </div>
    </section>
  );
};

export default TrustAndSupport;
