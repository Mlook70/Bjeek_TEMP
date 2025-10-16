import { Metadata } from 'next';
import InvestmentFormClient from '@/components/InvestmentForm/InvestmentFormClient';

interface InvestmentFormPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ 
  params 
}: InvestmentFormPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  const baseUrl = 'https://bjeek.com';
  
  return {
    title: isArabic 
      ? "استثمر في بجيك - فرصة استثمارية في مستقبل التوصيل السعودي" 
      : "Invest in Bjeek - Investment Opportunity in Saudi Delivery Future",
    description: isArabic
      ? "انضم إلى آلاف المستثمرين الناجحين واستثمر في بجيك. أول تطبيق سعودي شامل لخدمات التوصيل. استثمار آمن وعوائد مضمونة."
      : "Join thousands of successful investors and invest in Bjeek. Saudi Arabia's first comprehensive delivery services app. Safe investment with guaranteed returns.",
    keywords: isArabic
      ? "استثمار بجيك, فرصة استثمارية, استثمار سعودي, تطبيق توصيل, استثمار تقني, بجيك, رؤية 2030"
      : "Bjeek investment, investment opportunity, Saudi investment, delivery app, tech investment, Bjeek, Vision 2030",
    openGraph: {
      title: isArabic 
        ? "استثمر في بجيك - فرصة استثمارية في مستقبل التوصيل" 
        : "Invest in Bjeek - Investment Opportunity in Delivery Future",
      description: isArabic
        ? "انضم إلى آلاف المستثمرين الناجحين واستثمر في بجيك. استثمار آمن وعوائد مضمونة."
        : "Join thousands of successful investors and invest in Bjeek. Safe investment with guaranteed returns.",
      images: [
        {
          url: "/og-investment-ar.jpg",
          width: 1200,
          height: 630,
          alt: isArabic ? "استثمر في بجيك" : "Invest in Bjeek",
        },
      ],
    },
    twitter: {
      title: isArabic 
        ? "استثمر في بجيك - فرصة استثمارية" 
        : "Invest in Bjeek - Investment Opportunity",
      description: isArabic
        ? "انضم إلى آلاف المستثمرين الناجحين واستثمر في مستقبلك المالي"
        : "Join thousands of successful investors and invest in your financial future",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/investment-form`,
    },
  };
}

export default async function InvestmentFormPage({ params }: InvestmentFormPageProps) {
  // This is now SSR - the page itself is server-rendered
  // But the form component is client-side for interactivity
  await params; // Ensure params are resolved
  
  return<>
  <InvestmentFormClient />
  {/* <div className='flex justify-center items-center h-screen'>
    <div className='text-center gap-4'>
    <p className='text-4xl font-bold mb-4'>Investment Form Coming Soon</p>
    <p className='text-xl'>We will notify you when it is available</p>
    </div>
  </div> */}
      </> ;
}
