import { getMessages } from '@/i18n';
import OurServices from '@/components/Home/OurServices';
import InvestmentOpportunity from '@/components/Home/InvestmentOpportunity';
import InvestmentDashboard from '@/components/Home/InvestmentDashboard';
import TrustAndSupport from '@/components/Home/TrustAndSupport';
import type { Metadata } from 'next';
import ShaderHero from '@/components/Home/ShaderHero';
// import UnderConstruction from '@/components/common/UnderConstruction';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  
  return {
    title: isArabic 
      ? "بجيك - أول تطبيق شامل لخدمات التوصيل السعودية | استثمر الآن" 
      : "Bjeek - Saudi Arabia's First Comprehensive Delivery Services App | Invest Now",
    description: isArabic
      ? "بجيك يجمع جميع خدمات التوصيل في منصة واحدة - طعام، رحلات، طلبات، وبريد. استثمر في مستقبل التوصيل السعودي مع فرصة استثمارية تبدأ من 20,000 ريال. دعم رؤية 2030."
      : "Bjeek brings all delivery services together in one platform - food, rides, orders, and mail. Invest in Saudi Arabia's delivery future with investment opportunities starting from 20,000 SAR. Supporting Vision 2030.",
    keywords: isArabic
      ? "توصيل طعام السعودية, توصيل رحلات, توصيل طلبات, توصيل بريد, تطبيق توصيل سعودي, استثمار تقني, بجيك, منصة توصيل, تطبيق سعودي, رؤية 2030, استثمار ريال سعودي"
      : "Saudi food delivery, ride sharing Saudi Arabia, package delivery, mail delivery, Saudi delivery app, tech investment, Bjeek, delivery platform, Saudi app, Vision 2030, SAR investment",
    authors: [{ name: "Bjeek Team" }],
    creator: "Bjeek",
    publisher: "Bjeek",
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
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_SA" : "en_US",
      siteName: isArabic ? "بجيك" : "Bjeek",
      title: isArabic 
        ? "بجيك - أول تطبيق شامل لخدمات التوصيل السعودية" 
        : "Bjeek - Saudi Arabia's First Comprehensive Delivery Services App",
      description: isArabic
        ? "بجيك يجمع جميع خدمات التوصيل في منصة واحدة - طعام، رحلات، طلبات، وبريد. استثمر في مستقبل التوصيل السعودي."
        : "Bjeek brings all delivery services together in one platform - food, rides, orders, and mail. Invest in Saudi Arabia's delivery future.",
      images: [
        {
          url: "/og-home-ar.jpg",
          width: 1200,
          height: 630,
          alt: isArabic ? "بجيك - منصة التوصيل الشاملة" : "Bjeek - Comprehensive Delivery Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isArabic 
        ? "بجيك - أول تطبيق شامل لخدمات التوصيل السعودية" 
        : "Bjeek - Saudi Arabia's First Comprehensive Delivery Services App",
      description: isArabic
        ? "بجيك يجمع جميع خدمات التوصيل في منصة واحدة - طعام، رحلات، طلبات، وبريد."
        : "Bjeek brings all delivery services together in one platform - food, rides, orders, and mail.",
    },
  };
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  return (
    <>
      {/* <UnderConstruction/> */}
      
      {/* Commented out components - will be restored later */}
      
      <ShaderHero messages={messages} locale={locale} />
      <TrustAndSupport messages={messages} locale={locale} />
      <OurServices messages={messages} locale={locale} />
      <InvestmentDashboard messages={messages} />
      <InvestmentOpportunity messages={messages} locale={locale} />
     
    </>
  );
}