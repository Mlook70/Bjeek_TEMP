'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

const locales = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' },
  { code: 'ar', name: 'العربية' },
];

export default function LanguageSwitcher() {
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
    <div className="absolute top-4 right-4 z-20">
      <select
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-black text-white border border-[#00B14F] rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B14F]"
        value={currentLocale}
      >
        {locales.map((loc) => (
          <option key={loc.code} value={loc.code}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
}