import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script';

// import WhatsAppFloatingButton from '@/components/common/WhatsAppFloatingButton';

import "../globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

// Enhanced metadata with proper SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  const isArabic = locale === 'ar';
  
  const baseUrl = 'https://bjeek.com';
  const currentUrl = `${baseUrl}/${locale}`;
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: isArabic 
        ? "بجيك - أول تطبيق شامل لخدمات التوصيل السعودية" 
        : "Bjeek - Saudi Arabia's First Comprehensive Delivery Services App",
      template: isArabic 
        ? "%s | بجيك" 
        : "%s | Bjeek"
    },
    description: isArabic
      ? "بجيك يجمع جميع خدمات التوصيل في منصة واحدة - طعام، رحلات، طلبات، وبريد. استثمر في مستقبل التوصيل السعودي مع فرصة استثمارية تبدأ من 20,000 ريال."
      : "Bjeek brings all delivery services together in one platform - food, rides, orders, and mail. Invest in Saudi Arabia's delivery future with investment opportunities starting from 20,000 SAR.",
    keywords: isArabic
      ? "توصيل طعام, توصيل رحلات, توصيل طلبات, توصيل بريد, تطبيق توصيل, السعودية, استثمار, بجيك, منصة توصيل, تطبيق سعودي"
      : "food delivery, ride sharing, package delivery, mail delivery, delivery app, Saudi Arabia, investment, Bjeek, delivery platform, Saudi app",
    authors: [{ name: "Bjeek Team" }],
    creator: "Bjeek",
    publisher: "Bjeek",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_SA" : "en_US",
      url: currentUrl,
      siteName: isArabic ? "بجيك" : "Bjeek",
      title: isArabic 
        ? "بجيك - أول تطبيق شامل لخدمات التوصيل السعودية" 
        : "Bjeek - Saudi Arabia's First Comprehensive Delivery Services App",
      description: isArabic
        ? "بجيك يجمع جميع خدمات التوصيل في منصة واحدة - طعام، رحلات، طلبات، وبريد. استثمر في مستقبل التوصيل السعودي."
        : "Bjeek brings all delivery services together in one platform - food, rides, orders, and mail. Invest in Saudi Arabia's delivery future.",
      images: [
        {
          url: "/og-image-ar.jpg",
          width: 1200,
          height: 630,
          alt: isArabic ? "بجيك - منصة التوصيل الشاملة" : "Bjeek - Comprehensive Delivery Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@bjeeksa",
      creator: "@bjeeksa",
      title: isArabic 
        ? "بجيك - أول تطبيق شامل لخدمات التوصيل السعودية" 
        : "Bjeek - Saudi Arabia's First Comprehensive Delivery Services App",
      description: isArabic
        ? "بجيك يجمع جميع خدمات التوصيل في منصة واحدة - طعام، رحلات، طلبات، وبريد."
        : "Bjeek brings all delivery services together in one platform - food, rides, orders, and mail.",
      images: ["/twitter-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'ar': `${baseUrl}/ar`,
        'en': `${baseUrl}/en`,
      },
    },
    verification: {
      google: "your-google-verification-code", // Replace with actual verification code
    },
    category: "technology",
  };
}

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
  const isArabic = locale === 'ar';
  const baseUrl = 'https://bjeek.com';

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": isArabic ? "بجيك" : "Bjeek",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/Logo.png`,
          "width": 200,
          "height": 200
        },
        "description": isArabic
          ? "بجيك يجمع جميع خدمات التوصيل في منصة واحدة، مع تجربة سهلة وسريعة تلبي احتياجات السوق السعودي."
          : "Bjeek brings all delivery services together in one platform, with an easy and fast experience that meets the needs of the Saudi market.",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+966-50-123-4567",
          "contactType": "customer service",
          "email": "info@bjeek.sa",
          "availableLanguage": ["Arabic", "English"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "SA",
          "addressLocality": "Riyadh",
          "addressRegion": "Riyadh Province"
        },
        "sameAs": [
          "https://twitter.com/bjeeksa",
          "https://instagram.com/bjeeksa",
          "https://snapchat.com/add/bjeeksa",
          "https://tiktok.com/@bjeeksa"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": isArabic ? "بجيك" : "Bjeek",
        "description": isArabic
          ? "أول تطبيق شامل لخدمات التوصيل السعودية"
          : "Saudi Arabia's First Comprehensive Delivery Services App",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "inLanguage": isArabic ? "ar" : "en"
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/${locale}/#webpage`,
        "url": `${baseUrl}/${locale}`,
        "name": isArabic 
          ? "بجيك - أول تطبيق شامل لخدمات التوصيل السعودية" 
          : "Bjeek - Saudi Arabia's First Comprehensive Delivery Services App",
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "about": {
          "@id": `${baseUrl}/#organization`
        },
        "description": isArabic
          ? "بجيك يجمع جميع خدمات التوصيل في منصة واحدة - طعام، رحلات، طلبات، وبريد."
          : "Bjeek brings all delivery services together in one platform - food, rides, orders, and mail.",
        "inLanguage": isArabic ? "ar" : "en"
      },
      {
        "@type": "Service",
        "name": isArabic ? "خدمات التوصيل الشاملة" : "Comprehensive Delivery Services",
        "description": isArabic
          ? "خدمات توصيل الطعام، الرحلات، الطلبات، والبريد في منصة واحدة"
          : "Food delivery, rides, orders, and mail services in one platform",
        "provider": {
          "@id": `${baseUrl}/#organization`
        },
        "serviceType": "Delivery Services",
        "areaServed": {
          "@type": "Country",
          "name": "Saudi Arabia"
        }
      }
    ]
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <GoogleTagManager gtmId="GTM-5HT84N5V" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <link rel="canonical" href={`${baseUrl}/${locale}`} />
        <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar`} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ar`} />
        <meta name="theme-color" content="#10b981" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
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