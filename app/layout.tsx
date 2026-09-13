
import React from 'react';

export const metadata = {
  title: 'Launch7 Studio | Cloud7.com',
  description: 'Custom websites delivered in seven days with full personal control.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#050811', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
