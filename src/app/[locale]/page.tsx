import { getMessages } from '@/i18n';
// import Hero from '@/components/Hero';
import OurServices from '@/components/Home/OurServices';
import InvestmentOpportunity from '@/components/Home/InvestmentOpportunity';
import InvestmentDashboard from '@/components/Home/InvestmentDashboard';
import TrustAndSupport from '@/components/Home/TrustAndSupport';
import type { Metadata } from 'next';
import ShaderHero from '@/components/Home/ShaderHero';

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
  const baseUrl = 'https://bjeek.com';
  
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
    openGraph: {
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
      title: isArabic 
        ? "بجيك - أول تطبيق شامل لخدمات التوصيل السعودية" 
        : "Bjeek - Saudi Arabia's First Comprehensive Delivery Services App",
      description: isArabic
        ? "بجيك يجمع جميع خدمات التوصيل في منصة واحدة - طعام، رحلات، طلبات، وبريد."
        : "Bjeek brings all delivery services together in one platform - food, rides, orders, and mail.",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
    },
  };
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  return (
    <>
      <ShaderHero messages={messages} />
      <TrustAndSupport messages={messages} />
      <OurServices messages={messages} />
      <InvestmentDashboard messages={messages} />
      <InvestmentOpportunity messages={messages} />
    </>
  );
}