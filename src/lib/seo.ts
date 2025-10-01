import { Metadata } from 'next';

interface SEOProps {
  locale: string;
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function generateSEOMetadata({
  locale,
  title,
  description,
  keywords,
  path = '',
  image,
  noIndex = false,
}: SEOProps): Metadata {
  const isArabic = locale === 'ar';
  const baseUrl = 'https://bjeek.com';
  const currentUrl = `${baseUrl}/${locale}${path}`;
  
  const defaultImage = isArabic ? '/og-image-ar.jpg' : '/og-image-en.jpg';
  const imageUrl = image ? `${baseUrl}${image}` : `${baseUrl}${defaultImage}`;

  return {
    title: {
      default: title,
      template: isArabic ? `%s | بجيك` : `%s | Bjeek`,
    },
    description,
    keywords: keywords || (isArabic
      ? "توصيل طعام, توصيل رحلات, توصيل طلبات, توصيل بريد, تطبيق توصيل, السعودية, استثمار, بجيك"
      : "food delivery, ride sharing, package delivery, mail delivery, delivery app, Saudi Arabia, investment, Bjeek"
    ),
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
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@bjeeksa",
      creator: "@bjeeksa",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'ar': `${baseUrl}/ar${path}`,
        'en': `${baseUrl}/en${path}`,
      },
    },
    verification: {
      google: "your-google-verification-code", // Replace with actual verification code
    },
    category: "technology",
  };
}

export function generateStructuredData({
  locale,
  type,
  data,
}: {
  locale: string;
  type: 'organization' | 'website' | 'webpage' | 'service' | 'investment';
  data: Record<string, unknown>;
}) {
  const isArabic = locale === 'ar';
  const baseUrl = 'https://bjeek.com';

  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type === 'organization' ? "Organization" : 
             type === 'website' ? "WebSite" :
             type === 'webpage' ? "WebPage" :
             type === 'service' ? "Service" : "InvestmentOrTrading",
    ...data,
  };

  return baseStructuredData;
}

export function generateInvestmentStructuredData(locale: string, investmentData: Record<string, unknown>) {
  const isArabic = locale === 'ar';
  const baseUrl = 'https://bjeek.com';

  return {
    "@context": "https://schema.org",
    "@type": "InvestmentOrTrading",
    "name": isArabic ? "استثمر مع بجيك" : "Invest with Bjeek",
    "description": isArabic 
      ? "فرصة استثمارية في مشروع تقني سعودي جاهز"
      : "Investment opportunity in a ready Saudi tech project",
    "provider": {
      "@type": "Organization",
      "name": isArabic ? "بجيك" : "Bjeek",
      "url": baseUrl,
    },
    "offers": {
      "@type": "Offer",
      "price": "20000",
      "priceCurrency": "SAR",
      "description": isArabic 
        ? "الاستثمار يبدأ من 20,000 ريال فقط"
        : "Investment starts from only 20,000 SAR",
      "availability": "https://schema.org/InStock",
    },
    "areaServed": {
      "@type": "Country",
      "name": "Saudi Arabia",
    },
  };
}
