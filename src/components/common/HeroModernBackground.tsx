'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Fixed particle positions to avoid hydration mismatch
const PARTICLE_DATA = [
  { left: 15.2, top: 25.8, duration: 3.2, delay: 0.5 },
  { left: 82.4, top: 67.1, duration: 4.1, delay: 1.2 },
  { left: 45.7, top: 12.9, duration: 2.8, delay: 2.1 },
  { left: 68.3, top: 89.4, duration: 3.7, delay: 0.8 },
  { left: 23.9, top: 54.6, duration: 4.5, delay: 1.8 },
  { left: 91.2, top: 33.2, duration: 3.1, delay: 0.3 },
  { left: 37.8, top: 76.5, duration: 2.9, delay: 2.7 },
  { left: 59.4, top: 18.7, duration: 4.2, delay: 1.5 },
  { left: 12.6, top: 92.3, duration: 3.4, delay: 0.9 },
  { left: 76.1, top: 41.8, duration: 2.7, delay: 2.3 },
  { left: 44.9, top: 63.2, duration: 3.8, delay: 1.1 },
  { left: 87.5, top: 15.4, duration: 4.3, delay: 0.6 },
  { left: 29.3, top: 84.7, duration: 3.0, delay: 2.0 },
  { left: 63.7, top: 37.9, duration: 2.6, delay: 1.7 },
  { left: 18.1, top: 71.5, duration: 4.0, delay: 0.4 },
  { left: 95.8, top: 52.3, duration: 3.5, delay: 2.5 },
  { left: 52.4, top: 28.1, duration: 2.8, delay: 1.3 },
  { left: 35.6, top: 95.7, duration: 4.4, delay: 0.7 },
  { left: 71.2, top: 49.8, duration: 3.3, delay: 1.9 },
  { left: 26.8, top: 61.4, duration: 3.9, delay: 2.4 }
];

const HeroModernBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Mouse position with smooth spring animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', updateWindowSize);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Mouse-reactive background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 177, 79, 0.15) 0%, rgba(0, 177, 79, 0.05) 30%, transparent 60%)`
        }}
      />

      {/* Animated Hexagonal Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main hexagonal grid with mouse interaction */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
                <polygon 
                  points="50,1 95,25 95,75 50,99 5,75 5,25" 
                  fill="none" 
                  stroke="#00B14F" 
                  strokeWidth="1.5"
                  opacity="0.6"
                />
              </pattern>
              {/* Mouse-reactive gradient pattern */}
              <pattern id="hexagons-bright" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
                <polygon 
                  points="50,1 95,25 95,75 50,99 5,75 5,25" 
                  fill="none" 
                  stroke="url(#hexGradient)" 
                  strokeWidth="1.5"
                  opacity="0.8"
                />
              </pattern>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00B14F" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#00B14F" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons-bright)" className="webkit-optimize" />
          </svg>
        </motion.div>

        {/* Mouse-reactive floating circle */}
        <motion.div
          className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-r from-[#00B14F]/30 to-emerald-400/30 rounded-full"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          style={{
            x: (mousePosition.x - 50) * 0.1,
            y: (mousePosition.y - 50) * 0.1,
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Mouse-reactive particle dots */}
        {PARTICLE_DATA.map((particle, i) => {
          const distance = Math.sqrt(
            Math.pow(particle.left - mousePosition.x, 2) + 
            Math.pow(particle.top - mousePosition.y, 2)
          );
          const influence = Math.max(0, 1 - distance / 50);
          
          return (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#00B14F] rounded-full shadow-sm shadow-[#00B14F]/50"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                scale: 1 + influence * 0.5,
                opacity: 0.5 + influence * 0.5
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.2 + influence * 0.3, 0],
                y: [0, -50, 0]
              }}
              transition={{ 
                duration: particle.duration,
                repeat: Infinity, 
                ease: "easeInOut",
                delay: particle.delay
              }}
            />
          );
        })}

        {/* Mouse-following light spot */}
        <motion.div
          className="absolute w-32 h-32 bg-gradient-radial from-[#00B14F]/20 via-[#00B14F]/10 to-transparent rounded-full blur-xl"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Dynamic light beams that follow mouse */}
        <motion.div
          className="absolute w-1 h-full bg-gradient-to-b from-[#00B14F]/40 via-[#00B14F]/20 to-transparent"
          style={{
            left: `${20 + (mousePosition.x * 0.3)}%`,
            top: 0,
          }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scaleX: [1, 1.5, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute w-1 h-full bg-gradient-to-b from-emerald-400/30 via-emerald-400/15 to-transparent"
          style={{
            left: `${70 - (mousePosition.x * 0.2)}%`,
            top: 0,
          }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scaleX: [1, 2, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#00B14F]/8 to-black/30"></div>

        {/* Mouse-reactive corner accent lines */}
        <motion.div 
          className="absolute top-0 left-0 w-32 h-32"
          style={{
            opacity: 0.6 + (mousePosition.x + mousePosition.y) * 0.002
          }}
        >
          <div className="absolute top-4 left-4 w-16 h-0.5 bg-[#00B14F]/60"></div>
          <div className="absolute top-4 left-4 w-0.5 h-16 bg-[#00B14F]/60"></div>
        </motion.div>
        
        <motion.div 
          className="absolute top-0 right-0 w-32 h-32"
          style={{
            opacity: 0.6 + (100 - mousePosition.x + mousePosition.y) * 0.002
          }}
        >
          <div className="absolute top-4 right-4 w-16 h-0.5 bg-emerald-400/60"></div>
          <div className="absolute top-4 right-4 w-0.5 h-16 bg-emerald-400/60"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-32 h-32"
          style={{
            opacity: 0.6 + (mousePosition.x + (100 - mousePosition.y)) * 0.002
          }}
        >
          <div className="absolute bottom-4 left-4 w-16 h-0.5 bg-[#00B14F]/60"></div>
          <div className="absolute bottom-4 left-4 w-0.5 h-16 bg-[#00B14F]/60"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 right-0 w-32 h-32"
          style={{
            opacity: 0.6 + ((100 - mousePosition.x) + (100 - mousePosition.y)) * 0.002
          }}
        >
          <div className="absolute bottom-4 right-4 w-16 h-0.5 bg-emerald-400/60"></div>
          <div className="absolute bottom-4 right-4 w-0.5 h-16 bg-emerald-400/60"></div>
        </motion.div>
      </div>

      {/* Diagonal Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,177,79,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(0,177,79,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>
    </>
  );
};

export default HeroModernBackground;
