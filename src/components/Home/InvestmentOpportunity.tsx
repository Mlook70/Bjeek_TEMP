import React from 'react';
import { TrendingUp, Users, Target, Zap } from 'lucide-react';
import '@/styles/animations.css';

interface InvestmentFeature {
  text: string;
}

interface MessagesType {
  investment: {
    title: string;
    features: InvestmentFeature[];
    cta: string;
  };
  cta: {
    joinUs: string;
  };
}

interface InvestmentOpportunityProps {
  messages: MessagesType;
  locale: string;
}

const InvestmentOpportunity = ({ messages, locale }: InvestmentOpportunityProps) => {

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
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-relaxed animate-fade-in-scale delay-300 hardware-accelerate"
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
              className="group relative animate-fade-in-up hardware-accelerate"
              style={{ animationDelay: `${500 + idx * 150}ms` }}
            >
              {/* Feature Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-500 ease-out hover:border-brand-green/50 hover:shadow-xl hover:shadow-brand-green/10 hover:scale-105 hover:-translate-y-2 p-8 h-full">
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/40 to-brand-green/50 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>
                
                {/* Icon */}
                <div className="mb-6 text-brand-green group-hover:text-white transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">
                  {featureIcons[idx]}
                </div>

                {/* Text */}
                <p className={`text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-light ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {feature.text}
                </p>

                {/* Luxury Border Animation */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-green/20 via-transparent to-brand-green/20 blur-sm"></div>
                </div>

                {/* Static Dot - Visible on Hover */}
                <div className={`absolute top-4 ${locale === 'ar' ? 'right-4' : 'left-4'} opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300`}>
                  <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {/* <div className="text-center">
          <Link
            href={`/${locale}/investment-form`}
            className="group relative inline-flex items-center px-8 md:px-12 py-4 md:py-6 text-base md:text-lg font-medium text-white bg-gradient-to-r from-brand-green to-brand-green/80 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-brand-green/25 hover:scale-105 animate-fade-in-scale delay-2000 hardware-accelerate"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green/80 to-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className={`relative z-10 flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              {messages.cta.joinUs}
              <ArrowLeft className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:translate-x-1 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </Link>
        </div> */}

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-1 h-32 bg-gradient-to-b from-brand-green to-transparent opacity-20 animate-scale-x delay-1200"></div>
        <div className="absolute bottom-1/4 right-8 w-1 h-32 bg-gradient-to-t from-brand-green to-transparent opacity-20 animate-scale-x delay-1500"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-brand-green to-transparent" />
    </section>
  );
};

export default InvestmentOpportunity;