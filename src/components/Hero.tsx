'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroModernBackground from './common/HeroModernBackground';

interface HeroMessages {
  soon: string;
  hero: {
    heroTitle: string;
    heroSubtitle1: string;
    heroSubtitle2: string;
    getStarted: string;
    seeHowItWorks: string;
  };
}

interface HeroProps {
  messages: HeroMessages;
}

const Hero = ({ messages }: HeroProps) => {
  return (
    <section 
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* Modern Animated Background */}
      <HeroModernBackground />
      
      {/* Background Overlay - Lighter for better pattern visibility */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      
      {/* Hero Content */}
      <motion.div 
        className="text-center relative z-20 px-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            src="/Logo.png"
            alt="Bjeek Logo"
            width={300}
            height={200}
            className="object-contain w-48 md:w-64 lg:w-80 h-auto"
            priority
          />
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide mb-8 leading-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          {messages.hero.heroTitle}
        </motion.h1>
        
        {/* Subtitle 1 */}
        <motion.p
          className="text-white/90 text-2xl md:text-3xl lg:text-4xl mb-6 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {messages.hero.heroSubtitle1}
        </motion.p>

        {/* Subtitle 2 */}
        <motion.p
          className="text-white/80 text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {messages.hero.heroSubtitle2}
        </motion.p>
        
        {/* Brand Line */}
        <motion.div 
          className="w-24 h-2 bg-[#00B14F] mx-auto rounded-full mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        />

        {/* CTA Buttons - HIDDEN */}
        {/* <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.button
            className="bg-[#00B14F] hover:bg-[#00B14F]/90 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {messages.hero.getStarted}
          </motion.button>
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Hero;
