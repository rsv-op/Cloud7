import type { Metadata, Viewport } from 'next';

// 1. FORCED MOBILE VIEWPORT SCALING
// This strictly prevents mobile browsers from rendering the desktop version and zooming out.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents layout breakage from pinch-to-zoom
  themeColor: '#050811', // Matches your Cloud7 dark ambient background
};

// 2. GLOBAL METADATA (SEO & Browser Tab Info)
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
    <html lang="en" style={{ backgroundColor: '#050811', margin: 0, padding: 0 }}>
      <body style={{ margin: 0, padding: 0, boxSizing: 'border-box', overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
