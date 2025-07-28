import type { Metadata } from "next";
import "../globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export const metadata: Metadata = {
  title: "SOON",
  description: "Coming soon",
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  
  return (
    <html lang={locale}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
} 