'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

interface MessagesType {
  navigation: {
    home: string;
    investment: string;
    joinNow: string;
  };
}

interface HeaderProps {
  messages: MessagesType;
}

const Header = ({ messages }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const navigationItems: Array<{ name: string; href: string; isButton?: boolean }> = [
    { name: messages.navigation.home, href: `/${locale}` },
    // { name: messages.navigation.investment, href: `/${locale}/investment-form` }, // HIDDEN
    // { name: messages.navigation.joinNow, href: '#join', isButton: true } // HIDDEN
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // Handle anchor links
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(href);
    }
    setIsMenuOpen(false);
  };

  const isActiveLink = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}`;
    }
    return pathname.includes(href.split('/').pop() || '');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavigation(`/${locale}`)}>
            <Image
              src="/Logo.png"
              alt="Logo"
              width={120}
              height={80}
              className="object-contain h-10 md:h-12 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`
                  relative px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300
                  ${item.isButton 
                    ? 'bg-gradient-to-r from-[#00B14F] to-[#00B14F]/80 text-white rounded-full px-6 py-3 hover:shadow-lg hover:shadow-[#00B14F]/25 hover:scale-105' 
                    : isActiveLink(item.href)
                      ? 'text-[#00B14F]'
                      : 'text-white hover:text-[#00B14F]'
                  }
                `}
              >
                {item.name}
                {!item.isButton && (
                  <span className={`
                    absolute bottom-0 left-0 w-full h-0.5 bg-[#00B14F] transform origin-left transition-transform duration-300
                    ${isActiveLink(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `} />
                )}
              </button>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher - Modified for header */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-white hover:text-[#00B14F] hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${isMenuOpen ? 'rotate-45' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="py-4 space-y-2 border-t border-white/10">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`
                  block w-full ${locale === 'ar' ? 'text-right' : 'text-left'} px-4 py-3 text-base font-medium rounded-lg transition-all duration-200
                  ${item.isButton 
                    ? 'bg-gradient-to-r from-[#00B14F] to-[#00B14F]/80 text-white mx-2 text-center hover:shadow-lg hover:shadow-[#00B14F]/25' 
                    : isActiveLink(item.href)
                      ? 'text-[#00B14F] bg-[#00B14F]/10'
                      : 'text-white hover:text-[#00B14F] hover:bg-white/5'
                  }
                `}
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="sm:hidden px-4 pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
