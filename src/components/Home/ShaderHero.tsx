// import PulsingBorderShader from "./pulsing-border-shader"
import '@/styles/animations.css'
// import Link from 'next/link'
// import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

interface HeroMessages {
  hero: {
    heroTitle: string;
    heroSubtitle1: string;
  };
  cta: {
    joinUs: string;
  };
}

interface ShaderHeroProps {
  messages: HeroMessages;
  locale: string;
}

export default function ShaderHero({ messages, locale }: ShaderHeroProps) {
  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Background Image - Optimized for LCP */}
      <Image
        src="/bg_1.png"
        alt="Bjeek Hero Background"
        fill
        priority
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        className="object-cover object-center opacity-30"
      />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 " />

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex items-center justify-center min-h-[80vh]">
          {/* Centered Text content */}
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              {/* Main Title */}
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] sm:leading-[1.2] animate-fade-in-scale delay-600 hardware-accelerate"
              >
                {messages.hero.heroTitle}
              </h1>

              {/* Subtitle */}
              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-900 hardware-accelerate"
              >
                {messages.hero.heroSubtitle1}
              </p>
            </div>

            {/* Brand Line */}
            <div 
              className="w-20 sm:w-24 h-1.5 sm:h-2 bg-[#00B14F] mx-auto rounded-full animate-scale-x delay-1500 hardware-accelerate"
            />
            
            {/* CTA Button */}
            {/* <Link
              href={`/${locale}/investment-form`}
              className="group relative inline-flex items-center px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-[#00b14f] to-[#00b14f]/80 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#00b14f]/25 hover:scale-105 animate-bounce-smooth delay-1800 hardware-accelerate"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00b14f]/80 to-[#00b14f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className={`relative z-10 flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                {messages.cta.joinUs}
                <ArrowLeft className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:translate-x-1 ${locale === 'ar' ? 'rotate-180' : ''}`} />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </Link> */}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-[#259244] to-transparent" />
    </div>
  )
}