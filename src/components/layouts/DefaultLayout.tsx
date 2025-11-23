import React from 'react';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

// Simple wrapper component for blog pages
// The actual layout (Header/Footer) is handled by ConditionalLayout in the root layout
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return <>{children}</>;
}

