import { getMessages } from '@/i18n';
import type { Metadata } from 'next';
import LinkTree from '@/components/LinkTree';

interface LinkTreePageProps {
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
    title: "Bjeek Links - Connect with Us",
    description: "Find all our important links, social media, and resources in one place.",
  };
}

export default async function LinkTreePage({ params }: LinkTreePageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212121] via-[#171717] to-[#0a0a0a]">
      <LinkTree messages={messages} />
    </div>
  );
}
