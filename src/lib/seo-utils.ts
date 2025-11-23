import { Metadata } from 'next';

interface SEOMetadataParams {
  title: string;
  description: string;
  keywords?: string;
  url: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
  locale?: string;
}

export function generateMetadata({
  title,
  description,
  keywords,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  image = '/opengraph-image.png',
  locale = 'ar',
}: SEOMetadataParams): Metadata {
  const isArabic = locale === 'ar';
  const siteUrl = 'https://bjeek.com';
  const fullUrl = `${siteUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: isArabic ? 'بجيك' : 'Bjeek',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: isArabic ? 'ar_SA' : 'en_US',
      type: type === 'article' ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@bjeeksa',
    },
  };

  // Add article-specific metadata if type is article
  if (type === 'article' && (publishedTime || modifiedTime || author)) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
    };
  }

  return metadata;
}

export interface Breadcrumb {
  name: string;
  href: string;
}

export function generateBreadcrumbs(locale: string, items: Breadcrumb[]): Breadcrumb[] {
  const isArabic = locale === 'ar';
  const homeLabel = isArabic ? 'الرئيسية' : 'Home';

  return [
    { name: homeLabel, href: '/' },
    ...items,
  ];
}

