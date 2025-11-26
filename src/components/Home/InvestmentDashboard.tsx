'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import '@/styles/animations.css';

// Dynamically import Recharts components with no SSR for better performance
const LineChart = dynamic(() => import('recharts').then(mod => ({ default: mod.LineChart })), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => ({ default: mod.Line })), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => ({ default: mod.XAxis })), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => ({ default: mod.YAxis })), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => ({ default: mod.CartesianGrid })), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => ({ default: mod.Tooltip })), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => ({ default: mod.ResponsiveContainer })), { ssr: false });

interface InvestmentMessages {
  dashboard: {
    title: string;
    subtitle: string;
    chartTitle: string;
    chartSubtitle: string;
    legend: string;
    years: string;
    priceLabel: string;
    tooltipPrice: string;
    tooltipYear: string;
  };
}

interface InvestmentDashboardProps {
  messages: InvestmentMessages;
}

// Sample data for stock price expectations (5-year projection)
const stockData = [
  { year: '2025', price: 4 },
  { year: '2026', price: 6 },
  { year: '2027', price: 20 },
  { year: '2028', price: 23 },
  { year: '2029', price: 26 } 
];

const InvestmentDashboard: React.FC<InvestmentDashboardProps> = ({ messages }) => {
  return (
    <section className="py-20 px-6 relative">
      {/* Section Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-relaxed animate-fade-in-scale delay-300 hardware-accelerate">
          {messages.dashboard.title}
        </h2>
        <p className="text-white/80 text-2xl md:text-3xl lg:text-4xl leading-relaxed animate-fade-in-up delay-500 hardware-accelerate">
          {messages.dashboard.subtitle}
        </p>
      </div>

      {/* Stock Price Chart */}
      <div className="max-w-7xl mx-auto animate-fade-in-up delay-700 hardware-accelerate">
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-500 ease-out hover:border-brand-green/50 hover:shadow-lg hover:shadow-brand-green/10 hover:scale-[1.01] rounded-3xl p-8">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {messages.dashboard.chartTitle}
            </h3>
            <p className="text-white/70 text-lg">
              {messages.dashboard.chartSubtitle}
            </p>
          </div>
          
          <div className="h-96 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="year" 
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={14}
                  label={{ value: messages.dashboard.years, position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)' } }}
                />
                <YAxis 
                  domain={[0, 30]}
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={14}
                  label={{ value: messages.dashboard.priceLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)' } }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(37, 146, 68, 0.3)',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                  formatter={(value) => [`${value} SAR`, messages.dashboard.tooltipPrice]}
                  labelFormatter={(label) => `${messages.dashboard.tooltipYear}: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#259244" 
                  strokeWidth={4}
                  dot={{ fill: '#259244', strokeWidth: 2, r: 8 }}
                  name={messages.dashboard.tooltipPrice}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
              <div className="w-4 h-1 bg-brand-green rounded animate-scale-x delay-1200"></div>
              <span className="text-white/80 text-sm">{messages.dashboard.legend}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentDashboard;