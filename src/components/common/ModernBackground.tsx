'use client';

import React from 'react';

const ModernBackground: React.FC = () => {
  return (
    <>
      {/* Modern Lamp Effect Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Main spotlight effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/15 via-green-500/20 to-teal-500/15 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Secondary spotlight */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#00B14F]/10 to-[#00B14F]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Bottom spotlight */}
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#00B14F]/10 to-[#00B14F]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating orbs */}
        {/* <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-400/15 to-green-400/15 rounded-full blur-xl animate-bounce" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-teal-400/15 to-emerald-400/15 rounded-full blur-xl animate-bounce" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/5 w-16 h-16 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-lg animate-bounce" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-20 h-20 bg-gradient-to-r from-emerald-300/15 to-teal-300/15 rounded-full blur-lg animate-bounce" style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
         */}
        {/* Moving light rays */}
        <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-[#00B14F]/20 via-transparent to-transparent blur-sm animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-[#00B14F]/15 via-transparent to-transparent blur-sm animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(5,150,105,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(5,150,105,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0"></div>
    </>
  );
};

export default ModernBackground;
