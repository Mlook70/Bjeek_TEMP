'use client'

import PulsingBorderShader from "./pulsing-border-shader"
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroMessages {
  soon: string;
  hero: {
    heroTitle: string;
    heroSubtitle1: string;
    getStarted: string;
    seeHowItWorks: string;
  };
}

interface ShaderHeroProps {
  messages: HeroMessages;
}

export default function ShaderHero({ messages }: ShaderHeroProps) {
  return (
    <div className="min-h-screen bg-gray-600 text-white overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-emerald-900/20" />

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center min-h-[80vh]">
          {/* Left side - Text content */}
          <div className="space-y-6 sm:space-y-8 lg:pr-8 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              {/* Main Title */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-center lg:text-left leading-[1.1] sm:leading-[1.2]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
              >
                {messages.hero.heroTitle}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-center lg:text-left px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                {messages.hero.heroSubtitle1}
              </motion.p>
            </div>

            {/* Brand Line */}
            <motion.div 
              className="w-20 sm:w-24 h-1.5 sm:h-2 bg-[#00B14F] mx-auto lg:mx-0 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            />
          </div>

          {/* Right side - Animation */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative">
              {/* Glow effect behind the shader */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl scale-110" />

              {/* Main shader component - Responsive sizing */}
              <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[535px] lg:h-[511px]">
                <PulsingBorderShader />
              </div>

              {/* Floating elements - Responsive positioning */}
              <div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="absolute top-1/3 -left-3 sm:-left-6 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-1/4 -right-4 sm:-right-8 w-3 h-3 sm:w-4 sm:h-4 bg-green-300 rounded-full animate-bounce"
                style={{ animationDelay: "2s" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-gray-600 to-transparent" />
    </div>
  )
}
