import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';
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
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}