
import type { Metadata, Viewport } from 'next';
import React from 'react';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#050811',
};

export const metadata: Metadata = {
  title: 'Cloud7.com | Master Operations',
  description: 'Automated digital architecture and operational infrastructure deployed in 7 days.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#050811' }}>
      <body style={{ margin: 0, padding: 0, boxSizing: 'border-box', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
