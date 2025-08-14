'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Target, Zap, Eye, ArrowLeft } from 'lucide-react';
import { useLocale } from 'next-intl';

interface InvestmentFeature {
  text: string;
}

interface MessagesType {
  investment: {
    title: string;
    features: InvestmentFeature[];
    cta: string;
  };
}

interface InvestmentOpportunityProps {
  messages: MessagesType;
}

const InvestmentOpportunity = ({ messages }: InvestmentOpportunityProps) => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const locale = useLocale();

  const featureIcons = [
    <TrendingUp key="trending-1" className="w-8 h-8" />,
    <Zap key="zap" className="w-8 h-8" />,
    <Target key="target-1" className="w-8 h-8" />,
    <Users key="users" className="w-8 h-8" />,
    <Target key="target-2" className="w-8 h-8" />,
    <TrendingUp key="trending-2" className="w-8 h-8" />
  ];

  return (
    <section className="py-16 relative overflow-hidden">
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
            {messages.investment.title}
          </motion.h2>
        </motion.div>
        
        {/* Investment Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {messages.investment.features.map((feature, idx) => (
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
              onMouseEnter={() => setHoveredFeature(idx)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Feature Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-700 group-hover:border-[#00b14f]/50 p-8 h-full">
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-2xl"></div>
                
                {/* Icon */}
                <motion.div
                  className="mb-6 text-[#00b14f] group-hover:text-white transition-colors duration-500"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {featureIcons[idx]}
                </motion.div>

                {/* Text */}
                <motion.p 
                  className={`text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-light ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {feature.text}
                </motion.p>

                {/* Luxury Border Animation */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00b14f]/20 via-transparent to-[#00b14f]/20 blur-sm"></div>
                </div>

                {/* Animated Dots */}
                <AnimatePresence>
                  {hoveredFeature === idx && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className={`absolute top-4 ${locale === 'ar' ? 'right-4' : 'left-4'}`}
                    >
                      <div className="w-2 h-2 bg-[#00b14f] rounded-full animate-pulse"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button - HIDDEN */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="https://drive.google.com/file/d/1g9xFiK_p-ee5WJnSaM7IkTq0eye4r4fH/view"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center px-12 py-6 text-lg font-light text-white bg-gradient-to-r from-[#00b14f] to-[#00b14f]/80 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#00b14f]/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00b14f]/80 to-[#00b14f] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className={`relative z-10 flex items-center gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Eye className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              {messages.investment.cta}
              <ArrowLeft className={`w-6 h-6 transition-all duration-300 group-hover:translate-x-1 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </motion.a>
        </motion.div> */}

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-1 h-32 bg-gradient-to-b from-[#00b14f] to-transparent opacity-20"></div>
        <div className="absolute bottom-1/4 right-8 w-1 h-32 bg-gradient-to-t from-[#00b14f] to-transparent opacity-20"></div>
      </div>
    </section>
  );
};

export default InvestmentOpportunity;
