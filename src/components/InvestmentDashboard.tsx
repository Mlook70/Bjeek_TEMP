'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


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
      <motion.div
        className="text-center mb-16 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00b14f] to-white mb-6 leading-relaxed">
          {messages.dashboard.title}
        </h2>
        <p className="text-white/80 text-2xl md:text-3xl lg:text-4xl leading-relaxed">
          {messages.dashboard.subtitle}
        </p>
      </motion.div>



      {/* Stock Price Chart */}
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {messages.dashboard.chartTitle}
            </h3>
            <p className="text-white/70">
              {messages.dashboard.chartSubtitle}
            </p>
          </div>
          
          <div className="h-96">
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
                    border: '1px solid rgba(0, 177, 79, 0.3)',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                  formatter={(value: number, name: string) => [`${value} ريال`, messages.dashboard.tooltipPrice]}
                  labelFormatter={(label: string) => `${messages.dashboard.tooltipYear}: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#00B14F" 
                  strokeWidth={4}
                  dot={{ fill: '#00B14F', strokeWidth: 2, r: 8 }}
                  name={messages.dashboard.tooltipPrice}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-[#00B14F] rounded"></div>
              <span className="text-white/80 text-sm">{messages.dashboard.legend}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default InvestmentDashboard;
