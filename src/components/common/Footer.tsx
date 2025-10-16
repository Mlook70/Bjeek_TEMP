'use client'

import React from 'react';
import { useLocale } from 'next-intl';
import { Mail, Phone, MapPin, Twitter, Instagram, ArrowLeft } from 'lucide-react';
import { FaTiktok, FaSnapchatGhost } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/animations.css';

interface FooterMessages {
  footer: {
    company: {
      name: string;
      description: string;
    };
    quickLinks: {
      title: string;
      links: {
        home: string;
        services: string;
        about: string;
        contact: string;
        investment: string;
      };
    };
    contact: {
      title: string;
      email: string;
      phone: string;
      address: string;
    };
    social: {
      title: string;
      description: string;
    };
    copyright: string;
    legal: {
      privacy: string;
      terms: string;
    };
  };
  cta: {
    joinUs: string;
  };
}

interface FooterProps {
  messages: FooterMessages;
}

const Footer = ({ messages }: FooterProps) => {
  const locale = useLocale();

  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/bjeeksa', label: 'X (Twitter)' },
    { icon: Instagram, href: 'https://www.instagram.com/bjeeksa/', label: 'Instagram' },
    { icon: FaTiktok, href: 'https://www.tiktok.com/@bjeeksa', label: 'TikTok' },
    { icon: FaSnapchatGhost, href: 'https://www.snapchat.com/add/bjeeksa', label: 'Snapchat' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black/90 to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="space-y-6 animate-fade-in-up delay-300 hardware-accelerate">
            <div className="flex items-center space-x-3">
              <Image
                src="/Logo.png"
                alt="Bjeek Logo"
                width={120}
                height={120}
                sizes="120px"
                className="object-contain w-[120px] h-auto"
                quality={90}
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {messages.footer.company.description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-[#00b14f] hover:bg-[#00b14f]/10 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 animate-fade-in-up delay-450 hardware-accelerate">
            <h3 className="text-lg font-medium text-white">
              {messages.footer.quickLinks.title}
            </h3>
            <div className="space-y-3">
              {Object.entries(messages.footer.quickLinks.links).map(([key, value]) => (
                <a
                  key={key}
                  href="#"
                  className="block text-white/70 hover:text-[#00b14f] transition-all duration-300 text-sm hover:translate-x-1"
                >
                  {value}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in-up delay-600 hardware-accelerate">
            <h3 className="text-lg font-medium text-white">
              {messages.footer.contact.title}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#00b14f]" />
                <span className="text-white/70 text-sm">{messages.footer.contact.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#00b14f]" />
                <span className="text-white/70 text-sm" dir="ltr">{messages.footer.contact.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#00b14f] mt-0.5" />
                <span className="text-white/70 text-sm leading-relaxed">
                  {messages.footer.contact.address}
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-6 animate-fade-in-up delay-750 hardware-accelerate">
            <h3 className="text-lg font-medium text-white">
              {messages.footer.social.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {messages.footer.social.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 bg-gradient-to-r from-[#00b14f]/20 to-[#00b14f]/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:from-[#00b14f]/40 hover:to-[#00b14f]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center animate-fade-in-up delay-900 hardware-accelerate">
          <Link
            href={`/${locale}/investment-form`}
            className="group relative inline-flex items-center px-8 md:px-12 py-4 md:py-6 text-base md:text-lg font-medium text-white bg-gradient-to-r from-[#00b14f] to-[#00b14f]/80 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#00b14f]/25 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00b14f]/80 to-[#00b14f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className={`relative z-10 flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              {messages.cta.joinUs}
              <ArrowLeft className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:translate-x-1 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 animate-fade-in delay-1050 hardware-accelerate">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/50 text-sm">
              {messages.footer.copyright}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 hover:text-[#00b14f] text-sm transition-colors duration-300">
                {messages.footer.legal.privacy}
              </a>
              <a href="#" className="text-white/50 hover:text-[#00b14f] text-sm transition-colors duration-300">
                {messages.footer.legal.terms}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-[#00b14f]/50 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-[#00b14f]/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
