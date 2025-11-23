'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

const locales = [
  { code: 'en', name: 'English' },
  // { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
  // { code: 'fr', name: 'Français' },
];

  interface LanguageSwitcherProps {
    className?: string;
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [currentLocale, setCurrentLocale] = useState(locale);

  // Update current locale when pathname changes
  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && locales.some(loc => loc.code === segments[0])) {
      setCurrentLocale(segments[0]);
    }
  }, [pathname]);

  const handleLanguageChange = (newLocale: string) => {
    // Don't do anything if the locale is the same
    if (newLocale === currentLocale) {
      return;
    }

    // Split the pathname into segments
    const segments = pathname.split('/').filter(Boolean);
    
    // If the first segment is a valid locale, replace it
    if (segments.length > 0 && locales.some(loc => loc.code === segments[0])) {
      segments[0] = newLocale;
      const newPath = `/${segments.join('/')}`;
      router.push(newPath);
    } else {
      // If no locale in path (shouldn't happen with 'always' prefix), prepend it
      const newPath = `/${newLocale}${pathname}`;
      router.push(newPath);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="language-switcher" className="sr-only">
        {currentLocale === 'ar' ? 'اختر اللغة' : 'Select Language'}
      </label>
      <select
        id="language-switcher"
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-black/50 text-white border border-brand-green/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green backdrop-blur-sm transition-all duration-200 hover:border-brand-green"
        value={currentLocale}
        aria-label={currentLocale === 'ar' ? 'اختر اللغة' : 'Select Language'}
      >
        {locales.map((loc) => (
          <option key={loc.code} value={loc.code} className="bg-black text-white">
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
}