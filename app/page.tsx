
// File: app/page.tsx
import React from 'react';
import LogisticsVerificationEngine from '../components/LogisticsVerificationEngine';

/**
 * B2B Account Activation Portal - Executive Hub
 * Architecture: Next.js App Router | Server Component
 * Role: Renders the institutional conversion copy and mounts the client verification engine.
 */

export default function LogisticsPortalHub() {
  return (
    <main className="portal-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        .portal-wrapper {
          min-height: 100vh;
          background-color: var(--bg-void, #0b132b);
          color: #f8fafc;
          font-family: var(--font-inter, system-ui, sans-serif);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 6rem 2rem;
        }

        .hero-section {
          text-align: center;
          max-width: 900px;
          margin-bottom: 4rem;
          animation: fade-in 0.8s ease-out forwards;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(56, 189, 248, 0.1);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: var(--font-space-grotesk, system-ui, sans-serif);
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .hero-title span {
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.25rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .engine-container {
          width: 100%;
          max-width: 800px;
          animation: slide-up 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      <section className="hero-section">
        <div className="hero-badge">Enterprise Logistics Architecture</div>
        <h1 className="hero-title">
          Frictionless Logistics Verification & <br />
          <span>Automated Fleet Provisioning</span>
        </h1>
        <p className="hero-description">
          Eradicate the 15-hour manual sync deficit. Instantly authenticate driver IDs, automate local fleet logging, and synchronize your transport matrix with zero administrative overhead. 100% data ownership. Zero SaaS lock-in.
        </p>
      </section>

      <section className="engine-container">
        <LogisticsVerificationEngine />
      </section>
    </main>
  );
}
