'use client';

import React from 'react';

const Icons = {
  ArrowLeft: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  Zap: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  TrendingDown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
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
          <span style={styles.forgePill}>ENTERPRISE MARKET RESEARCH & CASE STUDIES</span>
          <h1 style={styles.heroHeading}>The Empirical Cost of Administrative Latency</h1>
          <p style={styles.heroSubheading}>
            An institutional repository analyzing global enterprise studies. This data evaluates the financial decay caused by infrastructure friction, latency, and manual communication silos.
          </p>
        </div>

        {/* Study 01: Google & Deloitte Speed/Conversion Study */}
        <div style={styles.studyCard}>
          <div style={styles.studyHeader}>
            <div style={styles.iconBoxBlue}><Icons.Zap /></div>
            <div>
              <h3 style={styles.studyTitle}>The 0.1-Second Latency Impact Study</h3>
              <span style={styles.studySource}>Source: Google & Deloitte Digital Retail Benchmark</span>
            </div>
          </div>
          <div style={styles.studyBody}>
            <p style={styles.studyText}>
              Analyzing over 37 million sessions across global enterprise platforms, Google and Deloitte quantified the precise financial effect of structural response speed. 
              The empirical findings demonstrated that optimizing site architecture and reducing page load latency by just <strong>0.1 seconds</strong> yields an immediate, compounding lift in conversion volume.
            </p>
            <div style={styles.metricGrid}>
              <div style={styles.metricBox}>
                <span style={styles.metricLarge}>+8.4%</span>
                <span style={styles.metricLabel}>Retail conversion rate lift per 0.1s speed optimization</span>
              </div>
              <div style={styles.metricBox}>
                <span style={styles.metricLarge}>+10.1%</span>
                <span style={styles.metricLabel}>Travel and booking conversion increase</span>
              </div>
            </div>
            <p style={styles.studyTakeaway}>
              <strong>Cloud7 Operational Takeaway:</strong> Slow, unoptimized web platforms act as a silent tax on customer acquisition, actively repelling high-intent traffic before intake occurs.
            </p>
          </div>
        </div>

        {/* Study 02: Gartner Data Silo Revenue Loss */}
        <div style={styles.studyCard}>
          <div style={styles.studyHeader}>
            <div style={styles.iconBoxRed}><Icons.TrendingDown /></div>
            <div>
              <h3 style={styles.studyTitle}>Operational Inefficiency & Data Silos</h3>
              <span style={styles.studySource}>Source: Gartner Enterprise Operations Index</span>
            </div>
          </div>
          <div style={styles.studyBody}>
            <p style={styles.studyText>">
              Gartner research into mid-market and enterprise operational workflows revealed that organizations utilizing fragmented communication tools, manual spreadsheets, and unstructured email chains forfeit between <strong>20% to 30% of annual revenue</strong> strictly due to internal coordination friction.
            </p>
            <div style={styles.metricGrid}>
              <div style={styles.metricBox}>
                <span style={styles.metricLarge}>25% Avg</span>
                <span style={styles.metricLabel}>Annual revenue forfeiture due to manual process drag</span>
              </div>
              <div style={styles.metricBox}>
                <span style={styles.metricLarge}>4.5 hrs</span>
                <span style={styles.metricLabel}>Weekly administrative time lost per employee chasing records</span>
              </div>
            </div>
            <p style={styles.studyTakeaway}>
              <strong>Cloud7 Operational Takeaway:</strong> Replacing disconnected administrative processes with a unified digital hub eliminates invisible leakage and safeguards enterprise margins.
            </p>
          </div>
        </div>

        {/* Study 03: Forrester Self-Service Preference Report */}
        <div style={styles.studyCard}>
          <div style={styles.studyHeader}>
            <div style={styles.iconBoxPurple}><Icons.Users /></div>
            <div>
              <h3 style={styles.studyTitle}>The Self-Service Buyer Preference Shift</h3>
              <span style={styles.studySource}>Source: Forrester Research B2B Buyer Behavior Report</span>
            </div>
          </div>
          <div style={styles.studyBody}>
            <p style={styles.studyText}>
              Modern client acquisition has fundamentally evolved away from traditional gatekept sales cycles. Forrester data confirms that buyers overwhelmingly prefer autonomous digital touchpoints over manual negotiations.
            </p>
            <div style={styles.metricGrid}>
              <div style={styles.metricBox}>
                <span style={styles.metricLarge}>71%</span>
                <span style={styles.metricLabel}>Of modern buyers prefer self-service digital portals</span>
              </div>
              <div style={styles.metricBox}>
                <span style={styles.metricLarge}>3.2x</span>
                <span style={styles.metricLabel}>Higher close rate for organizations with instant intake logic</span>
              </div>
            </div>
            <p style={styles.studyTakeaway}>
              <strong>Cloud7 Operational Takeaway:</strong> Forcing clients through manual contact forms rather than providing an instant, automated portal creates friction that directly depresses conversion efficiency.
            </p>
          </div>
        </div>

        {/* Action Engine Hub */}
        <div style={styles.actionCard}>
          <h2 style={styles.actionHeading}>The Research Mandates Architecture.</h2>
          <p style={styles.actionText}>
            Latency loses revenue. Silos destroy margins. Deploy your centralized digital asset within 7 days.
          </p>
          <a href="/?vertical=Research-Backed+Enterprise+Deployment" style={{ textDecoration: 'none' }}>
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
  iconBoxRed: { padding: '10px', backgroundColor: 'rgba(244, 63, 94, 0.15)', borderRadius: '10px', border: '1px solid rgba(244, 63, 94, 0.3)' },
  iconBoxPurple: { padding: '10px', backgroundColor: 'rgba(168, 85, 247, 0.15)', borderRadius: '10px', border: '1px solid rgba(168, 85, 247, 0.3)' },
  studyTitle: { fontSize: '16px', fontWeight: 700, color: '#f8fafc', margin: '0 0 4px 0' },
  studySource: { fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' },
  studyBody: { padding: '24px' },
  studyText: { fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 20px 0' },
  
  metricGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' },
  metricBox: { backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' },
  metricLarge: { fontSize: '28px', fontWeight: 800, color: '#ffffff' },
  metricLabel: { fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 },
  
  studyTakeaway: { fontSize: '13px', color: '#f8fafc', backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #38bdf8', margin: 0 },

  actionCard: { backgroundColor: 'rgba(37, 99, 235, 0.1)', border: '1px solid #2563eb', borderRadius: '16px', padding: '32px', textAlign: 'center', marginTop: '16px' },
  actionHeading: { fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: '0 0 12px 0' },
  actionText: { fontSize: '14px', color: '#bae6fd', lineHeight: 1.5, margin: '0 0 24px 0' },
  primaryBtn: { width: '100%', padding: '16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 25px -5px rgba(37,99,235,0.4)' },

  footer: { textAlign: 'center', fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '40px', letterSpacing: '0.5px' }
};
