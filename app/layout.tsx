
import React from 'react';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });

export const metadata: Metadata = {
  title: 'Cloud7 | Automated Venture & Web Infrastructure Foundry',
  description: 'Production-grade software asset delivery with 100% client code ownership and zero monthly SaaS lock-in.',
};

const NAVIGATION_ROUTES = [
  { name: 'Executive Hub', href: '/' },
  { name: 'VerticalForge Diagnostic', href: '/verticalforge' },
  { name: 'Launch7 Studio', href: '/launch7' },
  { name: 'Code Analyzer', href: '/analyzer' },
  { name: 'CMS Dashboard', href: '/cms-dashboard' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --bg-void: #0b132b;
            --bg-surface: #1e293b;
            --bg-surface-hover: #334155;
            --accent-sky: #38bdf8;
            --accent-emerald: #10b981;
            --text-primary: #f8fafc;
            --text-secondary: #94a3b8;
            --text-muted: #64748b;
            --border-glass: 1px solid rgba(255, 255, 255, 0.08);
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background-color: var(--bg-void);
            color: var(--text-primary);
            font-family: var(--font-inter), system-ui, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
          }
          .c7-header {
            background-color: rgba(11, 19, 43, 0.85);
            backdrop-filter: blur(16px);
            border-bottom: var(--border-glass);
            position: sticky;
            top: 0;
            z-index: 1000;
          }
          .c7-nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.25rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .c7-brand {
            font-family: var(--font-space-grotesk), sans-serif;
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--text-primary);
            text-decoration: none;
          }
          .c7-brand span { color: var(--accent-sky); }
          .c7-nav-links { display: flex; gap: 2rem; align-items: center; }
          .c7-nav-links a {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            text-transform: uppercase;
          }
          .c7-nav-links a:hover { color: var(--text-primary); }
          .c7-main { flex: 1; width: 100%; display: flex; flex-direction: column; }
        `}} />
      </head>
      <body>
        <header className="c7-header">
          <nav className="c7-nav-container">
            <a href="/" className="c7-brand">Cloud<span>7</span></a>
            <div className="c7-nav-links">
              {NAVIGATION_ROUTES.map((route) => (
                <a key={route.href} href={route.href}>
                  {route.name}
                </a>
              ))}
            </div>
          </nav>
        </header>
        <main className="c7-main">
          {children}
        </main>
      </body>
    </html>
  );
}
