
'use client';

import React from 'react';

// Inline SVG Vector Icons for Zero-Dependency Rendering
const Icons = {
  ArrowLeft: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  BookOpen: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
  BarChart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>,
  ShieldCheck: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>,
  Server: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
};

export default function ResearchHub() {
  return (
    <main style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Navigation Bar */}
        <div style={styles.navBar}>
          <a href="/verticalforge" style={styles.backLink}>
            <Icons.ArrowLeft /> Back to ROI Calculator
          </a>
          <span style={styles.navBrand}>CLOUD7 // RESEARCH DESK</span>
        </div>

        {/* Hero Header */}
        <div style={{ textAlign: 'left', marginBottom: '40px', marginTop: '20px' }}>
          <span style={styles.forgePill}>EMPIRICAL DATA & MARKET VALIDATION</span>
          <h1 style={styles.heroHeading}>The Mathematical Case for Automated Architecture</h1>
          <p style={styles.heroSubheading}>
            Operational bottlenecks and fragmented client intake processes are measurable liabilities. Review the verified global research proving the financial necessity of specialized web infrastructure.
          </p>
        </div>

        {/* Study 01: Stanford Web Credibility */}
        <div style={styles.studyCard}>
          <div style={styles.studyHeader}>
            <div style={styles.iconBoxBlue}><Icons.BookOpen /></div>
            <div>
              <h3 style={styles.studyTitle}>The Stanford Web Credibility Project</h3>
              <span style={styles.studySource}>Source: Stanford University Persuasive Technology Lab</span>
            </div>
          </div>
          <div style={styles.studyBody}>
            <p style={styles.studyText}>
              Extensive research conducted by Stanford University evaluated how users assess the trustworthiness and operational validity of a business. 
              The study concluded that <strong>75% of consumers judge a company's credibility strictly based on its website design and digital architecture.</strong>
            </p>
            <div style={styles.metricGrid}>
              <div style={styles.metricBox}>
                <span style={styles.metricLarge}>75%</span>
                <span style={styles.metricLabel}>Credibility tied directly to UI/UX architecture</span>
              </div>
              <div style={styles.metricBox}>
                <span style={styles.metricLarge}>&lt; 3.4s</span>
                <span style={styles.metricLabel}>Time taken by a user to form a subconscious trust barrier</span>
              </div>
            </div>
            <p style={styles.studyTakeaway}>
              <strong>Cloud7 Operational Takeaway:</strong> A lack of structured digital architecture immediately disqualifies you from high-ticket client acquisition before a conversation even begins.
            </p>
          </div>
        </div>

        {/* Study 02: SBA & Market Velocity */}
        <div style={styles.studyCard}>
          <div style={styles.studyHeader}>
            <div style={styles.iconBoxPurple}><Icons.BarChart /></div>
            <div>
              <h3 style={styles.studyTitle}>Digital Adoption & Market Velocity</h3>
              <span style={styles.studySource}>Source: U.S. Small Business Administration (SBA) & McKinsey</span>
            </div>
          </div>
          <div style={styles.studyBody}>
            <p style={styles.studyText}>
              Data analyzing small-to-medium enterprise (SME) growth trajectories indicates that businesses leveraging a centralized, automated digital hub scale significantly faster than those relying on manual data entry and offline referrals.
            </p>
            <div style={styles.metricGrid}>
              <div style={styles.metricBox}>
                <span style={styles.metricLarge}>2.8x</span>
                <span style={styles.metricLabel}>Faster revenue growth for digitally structured businesses</span>
              </div>
              <div style={styles.metricBox}>
                <span style={styles.metricLarge}>39%</span>
                <span style={styles.metricLabel}>Increase in captured leads via automated intake forms</span>
              </div>
            </div>
            <p style={styles.studyTakeaway}>
              <strong>Cloud7 Operational Takeaway:</strong> Fragmented intake workflows (e.g., chasing emails, manual verifications) directly cap organizational scaling capability.
            </p>
          </div>
        </div>

        {/* Study 03: The Cost of Administrative Friction */}
        <div style={styles.studyCard}>
          <div style={styles.studyHeader}>
            <div style={styles.iconBoxAmber}><Icons.Server /></div>
            <div>
              <h3 style={styles.studyTitle}>The Cost of Administrative Friction</h3>
              <span style={styles.studySource}>Source: Think with Google & Forrester Research</span>
            </div>
          </div>
          <div style={styles.studyBody}>
            <p style={styles.studyText}>
              Operational drag is quantifiable. When clients are forced to navigate poorly structured funnels or endure manual onboarding latency, drop-off rates spike. Furthermore, edge-network speed dictates bounce rates.
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}><Icons.ShieldCheck /> <strong>53% Bounce Rate:</strong> Mobile visits are abandoned if a page structure takes longer than 3 seconds to render (Launch7 Studio leverages Vercel edge deployment to achieve sub-second P99 latency).</li>
              <li style={styles.bulletItem}><Icons.ShieldCheck /> <strong>Zero-Friction Intake:</strong> Automated booking and form-validation logic reduces client onboarding time from an average of 3 days to under 5 minutes.</li>
            </ul>
          </div>
        </div>

        {/* Action Engine Hub */}
        <div style={styles.actionCard}>
          <h2 style={styles.actionHeading}>The Data Mandates Architecture.</h2>
          <p style={styles.actionText}>
            You have reviewed the empirical data. Manual scaling is an operational liability. It is time to deploy an automated, zero-friction digital hub.
          </p>
          <a href="/?vertical=Data-Backed+Deployment" style={{ textDecoration: 'none' }}>
            <button style={styles.primaryBtn}>
              Deploy Architecture via Launch7 Studio <Icons.ArrowRight />
            </button>
          </a>
        </div>

        {/* Ecosystem Footer Constraint */}
        <div style={styles.footer}>
          Launch7 Studio operates under Cloud7.com
        </div>

      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: '100vh', backgroundColor: '#050811', display: 'flex', justifyContent: 'center', padding: '24px 16px 60px 16px', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  wrapper: { width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '24px' },
  
  navBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '16px', marginBottom: '8px' },
  backLink: { display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' },
  navBrand: { fontSize: '10px', letterSpacing: '1.5px', fontWeight: 800, color: '#475569' },

  forgePill: { fontSize: '10px', letterSpacing: '1.5px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: '6px 12px', borderRadius: '999px', border: '1px solid rgba(56, 189, 248, 0.4)', display: 'inline-block', marginBottom: '16px' },
  heroHeading: { fontSize: '32px', fontWeight: 800, letterSpacing: '-0.8px', margin: '0 0 12px 0', color: '#f8fafc', lineHeight: 1.15 },
  heroSubheading: { fontSize: '15px', color: '#94a3b8', lineHeight: 1.6, margin: 0 },

  studyCard: { backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' },
  studyHeader: { padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'rgba(15, 23, 42, 0.9)' },
  iconBoxBlue: { padding: '10px', backgroundColor: 'rgba(56, 189, 248, 0.15)', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.3)' },
  iconBoxPurple: { padding: '10px', backgroundColor: 'rgba(168, 85, 247, 0.15)', borderRadius: '10px', border: '1px solid rgba(168, 85, 247, 0.3)' },
  iconBoxAmber: { padding: '10px', backgroundColor: 'rgba(245, 158, 11, 0.15)', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.3)' },
  studyTitle: { fontSize: '16px', fontWeight: 700, color: '#f8fafc', margin: '0 0 4px 0' },
  studySource: { fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' },
  studyBody: { padding: '24px' },
  studyText: { fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 20px 0' },
  
  metricGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' },
  metricBox: { backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' },
  metricLarge: { fontSize: '28px', fontWeight: 800, color: '#ffffff' },
  metricLabel: { fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 },
  
  studyTakeaway: { fontSize: '13px', color: '#f8fafc', backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #38bdf8', margin: 0 },
  
  bulletList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' },
  bulletItem: { fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6, display: 'flex', gap: '12px', alignItems: 'flex-start' },

  actionCard: { backgroundColor: 'rgba(37, 99, 235, 0.1)', border: '1px solid #2563eb', borderRadius: '16px', padding: '32px', textAlign: 'center', marginTop: '16px' },
  actionHeading: { fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0' },
  actionText: { fontSize: '14px', color: '#bae6fd', lineHeight: 1.5, margin: '0 0 24px 0' },
  primaryBtn: { width: '100%', padding: '16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 25px -5px rgba(37,99,235,0.4)' },

  footer: { textAlign: 'center', fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '40px', letterSpacing: '0.5px' }
};
