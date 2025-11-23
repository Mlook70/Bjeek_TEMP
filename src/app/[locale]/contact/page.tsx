import type { Metadata } from 'next';
import Contact from '@/components/Contact/Contact';

interface ContactPageProps {
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
      ? "اتصل بنا - بجيك" 
      : "Contact Us - Bjeek",
    description: isArabic
      ? "تواصل معنا عبر واتساب. نحن هنا للإجابة على جميع استفساراتك ومساعدتك في أي شيء تحتاجه."
      : "Contact us via WhatsApp. We're here to answer all your questions and help you with anything you need.",
    keywords: isArabic
      ? "اتصل ببجيك, تواصل بجيك, واتساب بجيك, خدمة العملاء بجيك"
      : "contact Bjeek, Bjeek contact, Bjeek WhatsApp, Bjeek customer service",
    openGraph: {
      title: isArabic 
        ? "اتصل بنا - بجيك" 
        : "Contact Us - Bjeek",
      description: isArabic
        ? "تواصل معنا عبر واتساب. نحن هنا للإجابة على جميع استفساراتك."
        : "Contact us via WhatsApp. We're here to answer all your questions.",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  await params; // Ensure params is awaited for Next.js 15
  
  return <Contact />;
}

