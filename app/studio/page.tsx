
'use client';

import React from 'react';
import Link from 'next/link';

const Icons = {
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Zap: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Cpu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
};

export default function Cloud7ParentHub() {
  const corporateEmail = "richushaji96@gmail.com";
  
  // PARSER FIX: Safely construct URI components to eliminate illegal percent-token crashes
  const mailSubject = encodeURIComponent("Enterprise Inquiry // Cloud7.com");
  const mailBody = encodeURIComponent(
    "Hello Richu,\n\nWe require bespoke operational infrastructure for our enterprise. Details below:\n\n-"
  );
  const mailtoLink = `mailto:${corporateEmail}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <main style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Navigation Bar */}
        <header style={styles.navBar}>
          <span style={styles.navBrand}>CLOUD7.COM // MASTER OPERATIONS</span>
          <span style={styles.founderBadge}>FOUNDED BY RICHU SHAJI</span>
        </header>

        {/* Hero Section */}
        <section style={styles.heroSection}>
          <span style={styles.studioPill}>INFRASTRUCTURE ENGINEERING</span>
          <h1 style={styles.heroHeading}>Productized Operational Architecture.</h1>
          <p style={styles.heroSubheading}>
            Cloud7 eliminates administrative drag, centralizes fragmented data silos, and deploys high-conversion digital assets under a deterministic 7-day execution window.
          </p>
        </section>

        {/* Institutional Manifesto */}
        <section style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Icons.Shield />
            <h3 style={styles.cardTitle}>The High-Friction Operational Standard</h3>
          </div>
          <p style={styles.cardText}>
            Rooted in rigorous healthcare administration and complex verification workflows (central dispatch, automotive logistics, and regulatory credentialing), Cloud7 treats digital systems as mission-critical supply chains. A missing link, structural latency, or manual data entry point is classified as financial leakage. We build systems that run with absolute determinism.
          </p>
          <div style={styles.metricGrid}>
            <div style={styles.metricBox}>
              <span style={styles.metricLarge}>7 Days</span>
              <span style={styles.metricLabel}>Guaranteed end-to-end infrastructure deployment</span>
            </div>
            <div style={styles.metricBox}>
              <span style={styles.metricLarge}>Zero-Cost</span>
              <span style={styles.metricLabel}>Edge infrastructure built on native Next.js &amp; Vercel</span>
            </div>
          </div>
        </section>

        {/* Ecosystem Nodes */}
        <section style={styles.sectionHeader}>
          <h2 style={styles.sectionHeading}>Active Ecosystem Nodes</h2>
          <p style={styles.sectionSub}>Explore our productized diagnostic and execution engines.</p>
        </section>

        <section style={styles.nodeGrid}>
          {/* Node A: Launch7 Studio */}
          <div style={styles.nodeCard}>
            <div style={styles.nodeIconBox}><Icons.Cpu /></div>
            <h3 style={styles.nodeTitle}>Launch7 Studio</h3>
            <p style={styles.nodeText}>
              The productized web builder. Explore verified architecture templates, authenticate via secure credentialing, and lock your scope ($449 to $1049) for automated AI prompt synthesis.
            </p>
            <Link href="/studio" style={{ textDecoration: 'none', marginTop: 'auto' }}>
              <button style={styles.nodeBtn}>
                Access Studio <Icons.ArrowRight />
              </button>
            </Link>
          </div>

          {/* Node B: VerticalForge */}
          <div style={styles.nodeCard}>
            <div style={styles.nodeIconBox}><Icons.Zap /></div>
            <h3 style={styles.nodeTitle}>VerticalForge</h3>
            <p style={styles.nodeText}>
              The authoritative revenue leakage diagnostic. Calculate monthly financial decay across 10 industry verticals and transition instantly into our deployment pipeline.
            </p>
            <Link href="/verticalforge" style={{ textDecoration: 'none', marginTop: 'auto' }}>
              <button style={styles.nodeBtn}>
                Run Diagnostic <Icons.ArrowRight />
              </button>
            </Link>
          </div>
        </section>

        {/* Enterprise Inquiry Card */}
        <section style={styles.inquiryCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Icons.Mail />
            <h3 style={styles.cardTitle}>Bespoke Enterprise Consultations</h3>
          </div>
          <p style={styles.cardText}>
            For organizations requiring complex, multi-system integration beyond standard architectural tiers, connect directly with our engineering desk.
          </p>
          <a href={mailtoLink} style={{ textDecoration: 'none', display: 'block', marginTop: '20px' }}>
            <button style={styles.primaryBtn}>
              Initiate Corporate Inquiry <Icons.ArrowRight />
            </button>
          </a>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          Cloud7.com // Engineered by Richu Shaji
        </footer>

      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '6vh', paddingBottom: '60px', paddingLeft: '16px', paddingRight: '16px', boxSizing: 'border-box', backgroundColor: '#050811', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  wrapper: { width: '100%', maxWidth: '840px', display: 'flex', flexDirection: 'column', gap: '24px' },
  
  navBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '16px', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' },
  navBrand: { fontSize: '11px', letterSpacing: '1.5px', fontWeight: 800, color: '#38bdf8' },
  founderBadge: { fontSize: '10px', letterSpacing: '1px', fontWeight: 700, color: '#94a3b8', backgroundColor: '#0f172a', padding: '4px 10px', borderRadius: '6px', border: '1px solid #334155' },

  heroSection: { textAlign: 'left', marginBottom: '12px' },
  studioPill: { fontSize: '11px', letterSpacing: '1.5px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '6px 14px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block', marginBottom: '16px' },
  heroHeading: { fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, margin: '0 0 16px 0', lineHeight: 1.1, background: 'linear-gradient(135deg, #ffffff 20%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroSubheading: { fontSize: 'clamp(15px, 3.5vw, 17px)', color: '#cbd5e1', lineHeight: 1.6, margin: 0 },

  card: { backgroundColor: 'rgba(15, 23, 42, 0.95)', width: '100%', borderRadius: '24px', padding: 'clamp(24px, 5vw, 32px)', border: '1px solid #1e293b', boxSizing: 'border-box' },
  cardTitle: { fontSize: '18px', fontWeight: 800, color: '#f8fafc', margin: 0 },
  cardText: { fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: 0 },

  metricGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '24px' },
  metricBox: { backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' },
  metricLarge: { fontSize: '24px', fontWeight: 800, color: '#38bdf8' },
  metricLabel: { fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 },

  sectionHeader: { marginTop: '16px', marginBottom: '-8px' },
  sectionHeading: { fontSize: '22px', fontWeight: 800, color: '#f8fafc', margin: '0 0 4px 0' },
  sectionSub: { fontSize: '14px', color: '#94a3b8', margin: 0 },

  nodeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  nodeCard: { backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #1e293b', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box' },
  nodeIconBox: { width: '40px', height: '40px', backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  nodeTitle: { fontSize: '18px', fontWeight: 800, color: '#f8fafc', margin: 0 },
  nodeText: { fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, margin: 0 },
  nodeBtn: { width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#38bdf8', border: '1px solid #0284c7', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },

  inquiryCard: { backgroundColor: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '24px', padding: 'clamp(24px, 5vw, 32px)', boxSizing: 'border-box' },
  primaryBtn: { width: '100%', padding: '16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 20px rgba(37,99,235,0.25)' },

  footer: { textAlign: 'center', fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '20px', letterSpacing: '0.5px' }
};
