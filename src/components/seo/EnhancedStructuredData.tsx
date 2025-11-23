import React from 'react';
import Script from 'next/script';

interface Breadcrumb {
  name: string;
  href: string;
}

interface EnhancedStructuredDataProps {
  locale: string;
  pageType: 'website' | 'article' | 'webpage';
  breadcrumbs?: Breadcrumb[];
}

export default function EnhancedStructuredData({
  locale,
  pageType,
  breadcrumbs = [],
}: EnhancedStructuredDataProps) {
  const isArabic = locale === 'ar';
  const baseUrl = 'https://bjeek.com';
  const siteName = isArabic ? 'بجيك' : 'Bjeek';

  // Generate breadcrumb structured data
  const breadcrumbList = breadcrumbs.length > 0 ? {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.href}`,
    })),
  } : null;

  // Generate WebPage structured data
  const webPageData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}/#webpage`,
    url: baseUrl,
    name: siteName,
    description: isArabic
      ? 'بجيك - أول تطبيق شامل لخدمات التوصيل السعودية'
      : 'Bjeek - Saudi Arabia\'s First Comprehensive Delivery Services App',
    inLanguage: locale,
    ...(breadcrumbList && { breadcrumb: breadcrumbList }),
  };

  return (
    <Script
      id="enhanced-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(webPageData),
      }}
    />
  );
}

