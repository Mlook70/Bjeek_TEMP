import { getDictionary } from '@/lib/getDictionary';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/bg_1.png)',
      }}
    >
      <div className="absolute inset-0  bg-opacity-50"></div>
      <LanguageSwitcher />
      <div className="text-center relative z-10">
        <h1 className="text-8xl md:text-9xl font-bold text-white tracking-wider">
          {dictionary.soon}
        </h1>
        <div className="flex justify-center">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={300}
            height={200}
            className="object-contain"
            priority
          />
        </div>
        <div className="w-24 h-2 bg-[#00B14F] mx-auto mt-8"></div>
      </div>
    </div>
  );
}
