'use client';

import React from 'react';

const ModernBackground: React.FC = () => {
  return (
    <>
      {/* Modern Corner Spotlight Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Main corner spotlight effect - bottom-left */}
        <div 
          className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(34, 197, 94, 0.15) 30%, rgba(34, 197, 94, 0.05) 60%, transparent 80%)'
          }}
        ></div>
        
        {/* Secondary corner spotlight - bottom-right */}
        <div 
          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 177, 79, 0.2) 0%, rgba(0, 177, 79, 0.12) 30%, rgba(0, 177, 79, 0.04) 60%, transparent 80%)'
          }}
        ></div>
        
        {/* Accent spotlight - bottom-center */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(34, 197, 94, 0.15) 30%, rgba(34, 197, 94, 0.05) 60%, transparent 80%)'
          }}
        ></div>
        
        {/* Moving light rays from bottom */}
        <div className="absolute bottom-0 left-1/3 w-1 h-full bg-gradient-to-t from-[#00B14F]/20 via-transparent to-transparent blur-sm"></div>
        <div className="absolute bottom-0 right-1/3 w-1 h-full bg-gradient-to-t from-[#00B14F]/15 via-transparent to-transparent blur-sm"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(5,150,105,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(5,150,105,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0"></div>
    </>
  );
};

export default ModernBackground;
