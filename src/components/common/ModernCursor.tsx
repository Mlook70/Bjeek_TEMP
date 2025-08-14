'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ModernCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button' ||
        target.style.cursor === 'pointer' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button' ||
        target.style.cursor === 'pointer' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(false);
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#00B14F] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-[#00B14F]/40 rounded-full pointer-events-none z-[9998]"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: isClicking ? 1.2 : isHovering ? 2 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />

      {/* Trailing particles */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-[#00B14F]/60 rounded-full pointer-events-none z-[9997]"
        style={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 bg-[#00B14F]/10 rounded-full pointer-events-none z-[9996] blur-sm"
        style={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1.5,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      />
    </>
  );
};

export default ModernCursor;
