import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { GoogleTagManager } from '@next/third-parties/google'

// import WhatsAppFloatingButton from '@/components/common/WhatsAppFloatingButton';

import "../globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export const metadata: Metadata = {
  title: "SOON",
  description: "Coming soon",
};

// This is crucial - generates static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  
  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          <GoogleTagManager gtmId="GTM-5HT84N5V" />

      <body className="antialiased min-h-screen relative overflow-x-hidden">
        {/* WhatsApp Floating Button - HIDDEN */}
        {/* <WhatsAppFloatingButton /> */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header messages={messages} />
            <main className="pt-16 md:pt-20 flex-1">
              {children}
            </main>
            <Footer messages={messages} />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}