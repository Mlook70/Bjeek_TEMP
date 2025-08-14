'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Mail, Phone, MapPin, Twitter, Instagram } from 'lucide-react';
import { FaTiktok, FaSnapchatGhost } from 'react-icons/fa';
import Image from 'next/image';

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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Image
                src="/Logo.png"
                alt="Bjeek Logo"
                width={120}
                height={80}
                className="object-contain"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {messages.footer.company.description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-[#00b14f] hover:bg-[#00b14f]/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-medium text-white">
              {messages.footer.quickLinks.title}
            </h3>
            <div className="space-y-3">
              {Object.entries(messages.footer.quickLinks.links).map(([key, value]) => (
                <motion.a
                  key={key}
                  href="#"
                  className="block text-white/70 hover:text-[#00b14f] transition-colors duration-300 text-sm"
                  whileHover={{ x: locale === 'ar' ? -5 : 5 }}
                >
                  {value}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
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
                <span className="text-white/70 text-sm">{messages.footer.contact.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#00b14f] mt-0.5" />
                <span className="text-white/70 text-sm leading-relaxed">
                  {messages.footer.contact.address}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-medium text-white">
              {messages.footer.social.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {messages.footer.social.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 bg-gradient-to-r from-[#00b14f]/20 to-[#00b14f]/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:from-[#00b14f]/40 hover:to-[#00b14f]/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
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
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-[#00b14f]/50 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-[#00b14f]/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
