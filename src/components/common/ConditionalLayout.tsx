'use client'
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
  messages: {
    navigation?: {
      home: string;
      investment: string;
      joinNow: string;
      Links: string;
      blog: string;
    };
    footer?: {
      company: {
        name: string;
        description: string;
      };
      quickLinks: {
        title: string;
        links: {
          home: string;
          services: string;
          about: string;
          contact: string;
          investment: string;
        };
      };
      contact: {
        title: string;
        email: string;
        phone: string;
        address: string;
      };
      social: {
        title: string;
        description: string;
      };
      copyright: string;
      legal: {
        privacy: string;
        terms: string;
      };
    };
    cta?: {
      joinUs: string;
    };
    [key: string]: unknown;
  };
}

export default function ConditionalLayout({ children, messages }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isContactPage = pathname?.includes('/contact');

  return (
    <>
      {!isContactPage && <Header messages={messages as { navigation: NonNullable<typeof messages.navigation> }} />}
      <main className={isContactPage ? "flex-1" : "pt-16 md:pt-20 flex-1"}>
        {children}
      </main>
      {!isContactPage && <Footer messages={messages as { footer: NonNullable<typeof messages.footer>; cta: NonNullable<typeof messages.cta> }} />}
    </>
  );
}

