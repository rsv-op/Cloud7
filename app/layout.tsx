// File: app/layout.tsx

import React from 'react';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

/**
 * Cloud7 Institutional Design System & Global Layout
 * Architecture: Next.js App Router | Zero-Dependency Styling
 * Patch: Vercel Production Build - Mobile Viewport Nav Collision Resolution
 */

// Initialize optimized fonts
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Authoritative Metadata Configuration
export const metadata: Metadata = {
  title: 'Cloud7 | Automated Venture & Web Infrastructure Foundry',
  description: 'Production-grade software asset delivery with 100% client code ownership and zero monthly SaaS lock-in. Rapid deployment SLA.',
};

// Centralized Navigation Architecture
const NAVIGATION_ROUTES = [
  { name: 'Executive Hub', href: '/' },
  { name: 'VerticalForge Diagnostic', href: '/verticalforge' },
  { name: 'Launch7 Studio', href: '/launch7' },
];


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Zero-Dependency Global Design System Injection */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            /* Cloud7 Institutional Dark Void Palette */
            --bg-void: #0b132b;
            --bg-surface: #1e293b;
            --bg-surface-hover: #334155;
            --accent-sky: #38bdf8;
            --accent-emerald: #10b981;
            
            /* Typography Variables */
            --text-primary: #f8fafc;
            --text-secondary: #94a3b8;
            --text-muted: #64748b;
            
            /* Layout Geometry */
            --border-radius-sm: 4px;
            --border-radius-md: 8px;
            --border-radius-lg: 12px;
            --border-glass: 1px solid rgba(255, 255, 255, 0.08);
          }
          
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
            background-color: var(--bg-void);
            color: var(--text-primary);
            font-family: var(--font-inter), system-ui, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            overflow-x: hidden;
          }

          /* Display Typography Override */
          h1, h2, h3, h4, h5, h6, .display-font {
            font-family: var(--font-space-grotesk), system-ui, sans-serif;
            letter-spacing: -0.02em;
            margin-top: 0;
          }

          /* Global Navigation Architecture */
          .c7-header {
            background-color: rgba(11, 19, 43, 0.85);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: var(--border-glass);
            position: sticky;
            top: 0;
            z-index: 100;
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
            display: flex;
            align-items: center;
            letter-spacing: -0.04em;
          }

          .c7-brand span {
            color: var(--accent-sky);
          }

          .c7-nav-links {
            display: flex;
            gap: 2.5rem;
            align-items: center;
          }

          .c7-nav-links a {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            transition: color 0.2s ease, text-shadow 0.2s ease;
          }

          .c7-nav-links a:hover {
            color: var(--text-primary);
            text-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
          }

          /* Mobile Viewport Patch */
          @media (max-width: 768px) {
            .c7-nav-container {
              flex-direction: column;
              padding: 1rem;
              gap: 1rem;
            }
            .c7-brand {
              font-size: 1.75rem;
            }
            .c7-nav-links {
              width: 100%;
              justify-content: center;
              flex-wrap: wrap;
              gap: 1rem 1.5rem;
            }
            .c7-nav-links a {
              font-size: 0.85rem;
            }
          }

          /* Layout Primitives */
          .c7-main {
            flex: 1;
            width: 100%;
            display: flex;
            flex-direction: column;
          }

          .c7-footer {
            border-top: var(--border-glass);
            padding: 2.5rem 2rem;
            text-align: center;
            color: var(--text-muted);
            font-size: 0.875rem;
            background-color: #080e21;
          }
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
        
        <footer className="c7-footer">
          <p>&copy; {new Date().getFullYear()} Cloud7 Automated Venture & Web Infrastructure Foundry. 100% Client Code Ownership. Zero Lock-in.</p>
        </footer>
      </body>
    </html>
  );
}
