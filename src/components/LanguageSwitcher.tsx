'use client';

import { useRouter, usePathname } from 'next/navigation';

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

  const handleLanguageChange = (locale: string) => {
    const currentPath = pathname.split('/').slice(2).join('/');
    const newPath = `/${locale}${currentPath ? `/${currentPath}` : ''}`;
    router.push(newPath);
  };

  return (
    <div className="absolute top-4 right-4">
      <select
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-black text-white border border-[#00B14F] rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B14F]"
        defaultValue={pathname.split('/')[1] || 'en'}
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.name}
          </option>
        ))}
      </select>
    </div>
  );
} 