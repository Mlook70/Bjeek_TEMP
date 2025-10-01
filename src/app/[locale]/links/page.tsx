import type { Metadata } from 'next';
import Links from '@/components/Links/Links';
import { getMessages } from '@/i18n';

interface LinksPageProps {
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
      ? "روابط بجيك - تواصل معنا على وسائل التواصل الاجتماعي" 
      : "Bjeek Links - Connect with Us on Social Media",
    description: isArabic
      ? "اعثر على جميع روابطنا المهمة ووسائل التواصل الاجتماعي والموارد في مكان واحد. تواصل مع بجيك على تويتر، إنستغرام، سناب شات، وتيك توك."
      : "Find all our important links, social media, and resources in one place. Connect with Bjeek on Twitter, Instagram, Snapchat, and TikTok.",
    keywords: isArabic
      ? "روابط بجيك, وسائل التواصل الاجتماعي, تويتر بجيك, إنستغرام بجيك, سناب شات بجيك, تيك توك بجيك, تواصل بجيك"
      : "Bjeek links, social media, Bjeek Twitter, Bjeek Instagram, Bjeek Snapchat, Bjeek TikTok, contact Bjeek",
    openGraph: {
      title: isArabic 
        ? "روابط بجيك - تواصل معنا على وسائل التواصل الاجتماعي" 
        : "Bjeek Links - Connect with Us on Social Media",
      description: isArabic
        ? "اعثر على جميع روابطنا المهمة ووسائل التواصل الاجتماعي والموارد في مكان واحد."
        : "Find all our important links, social media, and resources in one place.",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/links`,
    },
  };
}

export default async function LinksPage({ params }: LinksPageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  return <Links messages={messages} />;
}
