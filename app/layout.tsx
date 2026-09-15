
// File: app/page.tsx

import React from 'react';
import Link from 'next/link';

/**
 * Cloud7 Executive Parent Hub
 * Architecture: Next.js App Router | Server Component
 * Role: Dual-engine routing and institutional brand positioning.
 */

export default function Cloud7Hub() {
  return (
    <div className="c7-hub-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        .c7-hub-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-section {
          text-align: center;
          max-width: 850px;
          margin-bottom: 5rem;
          animation: fade-in 0.8s ease-out forwards;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(16, 185, 129, 0.1);
          color: var(--accent-emerald);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 2rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .hero-title span {
          background: linear-gradient(135deg, var(--accent-sky), #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 3rem;
        }

        .engine-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2.5rem;
          width: 100%;
        }

        .engine-card {
          background-color: var(--bg-surface);
          border: var(--border-glass);
          border-radius: var(--border-radius-lg);
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .engine-card:hover {
          transform: translateY(-4px);
          border-color: rgba(56, 189, 248, 0.3);
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
        }

        .engine-card.emerald:hover {
          border-color: rgba(16, 185, 129, 0.3);
        }

        .engine-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--accent-sky);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .engine-card.emerald::before {
          background: var(--accent-emerald);
        }

        .engine-card:hover::before {
          opacity: 1;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .card-title {
          font-size: 1.75rem;
          color: var(--text-primary);
          margin: 0;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-family: var(--font-space-grotesk);
          font-size: 1.125rem;
        }

        .icon-sky {
          background: rgba(56, 189, 248, 0.1);
          color: var(--accent-sky);
        }

        .icon-emerald {
          background: rgba(16, 185, 129, 0.1);
          color: var(--accent-emerald);
        }

        .card-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          flex-grow: 1;
          font-size: 1.05rem;
        }

        .card-metrics {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .metric-item::before {
          content: '→';
          color: var(--accent-sky);
          font-weight: bold;
        }

        .emerald .metric-item::before {
          color: var(--accent-emerald);
        }

        .card-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 1.125rem;
          border-radius: var(--border-radius-md);
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .btn-outline-sky {
          background: transparent;
          color: var(--accent-sky);
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .engine-card:hover .btn-outline-sky {
          background: rgba(56, 189, 248, 0.1);
          border-color: var(--accent-sky);
        }

        .btn-outline-emerald {
          background: transparent;
          color: var(--accent-emerald);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .engine-card.emerald:hover .btn-outline-emerald {
          background: rgba(16, 185, 129, 0.1);
          border-color: var(--accent-emerald);
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.75rem;
          }
          .engine-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />

      <section className="hero-section">
        <div className="hero-badge">Zero-Cost Infrastructure</div>
        <h1 className="hero-title display-font">
          Automated Venture & <br /><span>Web Infrastructure Foundry</span>
        </h1>
        <p className="hero-description">
          Stop renting your business logic from SaaS conglomerates. We engineer and deploy 
          bespoke, edge-optimized software assets with absolute precision. Guaranteed rapid deployment, 
          100% client code ownership, and zero monthly platform lock-in.
        </p>
      </section>

      <section className="engine-grid">
        {/* VerticalForge Diagnostic Engine */}
        <Link href="/verticalforge" className="engine-card sky">
          <div className="card-header">
            <h2 className="card-title display-font">VerticalForge</h2>
            <div className="card-icon icon-sky">VF</div>
          </div>
          <p className="card-description">
            Operational Bottleneck Diagnostic & Revenue Reclamation Engine. Pinpoint administrative friction,
            calculate unrecovered revenue, and deterministically map your deficit to exact execution architectures.
          </p>
          <div className="card-metrics">
            <span className="metric-item">Calculate Pipeline Velocity</span>
            <span className="metric-item">Quantify Wasted Administrative Hours</span>
            <span className="metric-item">Trigger Intelligent Solution Matching</span>
          </div>
          <div className="card-action btn-outline-sky">
            Run Diagnostic Protocol
          </div>
        </Link>

        {/* Launch7 Studio Execution Platform */}
        <Link href="/launch7" className="engine-card emerald">
          <div className="card-header">
            <h2 className="card-title display-font">Launch7 Studio</h2>
            <div className="card-icon icon-emerald">L7</div>
          </div>
          <p className="card-description">
            Rapid-Deployment Execution Platform. Dispatch custom, production-ready web architectures 
            built from a catalog of pre-engineered vertical templates. Zero placeholders.
          </p>
          <div className="card-metrics">
            <span className="metric-item">7-Day Guaranteed Deployment SLA</span>
            <span className="metric-item">100% Client Code Ownership Transfer</span>
            <span className="metric-item">Automated GitHub & Vercel Handoff</span>
          </div>
          <div className="card-action btn-outline-emerald">
            Enter Execution Studio
          </div>
        </Link>
      </section>
    </div>
  );
}
