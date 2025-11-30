'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import '@/styles/animations.css';

export default function MinimalHeader() {
  const locale = useLocale();

  return (
    <header className="fixed pt-6 top-0 left-0 right-0 z-50 bg-black delay-200 hardware-accelerate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 md:h-20">
          {/* Left spacer for balance */}
          <div className="flex-1" />
          
          {/* Logo - Center */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`}>
              <Image
                src="/Logo.png"
                alt="Bjeek Logo"
                width={300}
                height={300}
                sizes="(max-width: 768px) 160px, 240px"
                className="object-contain w-32 md:w-48 lg:w-56 h-auto cursor-pointer hover:opacity-80 transition-opacity duration-300"
                priority
              />
            </Link>
          </div>

          {/* Language Switcher - Right */}
          <div className="flex-1 flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

