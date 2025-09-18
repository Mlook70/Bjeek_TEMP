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
  
  return {
    title: "SOON",
    description: "Coming soon",
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