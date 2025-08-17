import React from 'react';
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
        <div className="text-center mb-20">
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-[#41fc95] to-white mb-6 leading-relaxed"
            style={{
              lineHeight: '1.3',
              paddingTop: '0.15em',
              paddingBottom: '0.25em',
              minHeight: 'fit-content'
            }}
          >
            {messages.investment.title}
          </h2>
        </div>
        
        {/* Investment Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {messages.investment.features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              {/* Feature Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-[#00b14f]/50 hover:shadow-xl hover:shadow-[#00b14f]/10 p-8 h-full">
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Icon */}
                <div className="mb-6 text-[#00b14f] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  {featureIcons[idx]}
                </div>

                {/* Text */}
                <p className={`text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-light ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {feature.text}
                </p>

                {/* Luxury Border Animation */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00b14f]/20 via-transparent to-[#00b14f]/20 blur-sm"></div>
                </div>

                {/* Static Dot - Visible on Hover */}
                <div className={`absolute top-4 ${locale === 'ar' ? 'right-4' : 'left-4'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <div className="w-2 h-2 bg-[#00b14f] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button - HIDDEN */}
        {/* <div className="text-center">
          <a
            href="https://drive.google.com/file/d/1g9xFiK_p-ee5WJnSaM7IkTq0eye4r4fH/view"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center px-12 py-6 text-lg font-light text-white bg-gradient-to-r from-[#00b14f] to-[#00b14f]/80 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#00b14f]/25 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00b14f]/80 to-[#00b14f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className={`relative z-10 flex items-center gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Eye className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              {messages.investment.cta}
              <ArrowLeft className={`w-6 h-6 transition-all duration-300 group-hover:translate-x-1 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </a>
        </div> */}

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-1 h-32 bg-gradient-to-b from-[#00b14f] to-transparent opacity-20"></div>
        <div className="absolute bottom-1/4 right-8 w-1 h-32 bg-gradient-to-t from-[#00b14f] to-transparent opacity-20"></div>
      </div>
    </section>
  );
};

export default InvestmentOpportunity;