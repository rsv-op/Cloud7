
'use client';

import React, { useState } from 'react';

const Icons = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Alert: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Server: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  )
};

export default function VerticalForgeDiagnostic() {
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [diagnostics, setDiagnostics] = useState({
    dataCapture: '',
    clientOnboarding: '',
    turnaroundTime: '',
  });

  const handleSelection = (field: string, value: string, weight: number) => {
    setDiagnostics((prev) => ({ ...prev, [field]: value }));
    setScore((prev) => prev + weight);
    setTimeout(() => setStep((s) => s + 1), 400);
  };

  const renderDiagnosticResult = () => {
    let diagnosis = '';
    let recommendation = '';

    if (score >= 25) {
      diagnosis = 'Critical Operational Drag Detected';
      recommendation =
        'Your reliance on manual data entry and fragmented communications is causing severe latency. You require an immediate transition to a centralized, automated intake architecture.';
    } else if (score >= 15) {
      diagnosis = 'Moderate Friction & Bottlenecks';
      recommendation =
        'Your workflows function but do not scale. Transitioning to a productized digital hub will eliminate manual follow-ups and administrative overhead.';
    } else {
      diagnosis = 'Architectural Optimization Required';
      recommendation =
        'You have basic systems in place, but lack a unified, high-conversion digital presence to maximize client trust and lead velocity.';
    }

    return (
      <div style={styles.resultCard}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={styles.alertPill}>DIAGNOSTIC COMPLETE</span>
          <h2 style={{ ...styles.heading, color: score >= 25 ? '#f43f5e' : '#38bdf8' }}>{diagnosis}</h2>
          <p style={styles.subtext}>{recommendation}</p>
        </div>

        <div style={styles.dataGrid}>
          <div style={styles.dataBox}>
            <h4 style={styles.dataTitle}>Identified Friction Points</h4>
            <ul style={styles.list}>
              <li style={styles.listItem}><Icons.Alert /> {diagnostics.dataCapture}</li>
              <li style={styles.listItem}><Icons.Alert /> {diagnostics.clientOnboarding}</li>
              <li style={styles.listItem}><Icons.Alert /> {diagnostics.turnaroundTime}</li>
            </ul>
          </div>
          <div style={styles.dataBoxActive}>
            <h4 style={styles.dataTitleActive}>The VerticalForge Solution</h4>
            <ul style={styles.list}>
              <li style={styles.listItem}><Icons.Check /> Automated Intake & Validation Logic</li>
              <li style={styles.listItem}><Icons.Check /> Zero-Friction Client Handoffs</li>
              <li style={styles.listItem}><Icons.Check /> Immutable Digital Architecture</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
            Ready to permanently resolve these bottlenecks?
          </p>
          <a href="/" style={{ textDecoration: 'none' }}>
            <button style={styles.primaryBtn}>
              Deploy Architecture via Launch7 Studio <Icons.ArrowRight />
            </button>
          </a>
        </div>
      </div>
    );
  };

  return (
    <main style={styles.container}>
      <div style={styles.wrapper}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={styles.forgePill}>VERTICALFORGE // CLOUD7.COM</span>
          <h1 style={styles.heroHeading}>Operational Diagnostic Engine</h1>
          <p style={styles.heroSubheading}>
            Identify the administrative friction killing your scalability. Mathematically prove the necessity of specialized digital architecture.
          </p>
        </div>

        <div style={styles.card}>
          {step <= 3 && (
            <div style={styles.progressHeader}>
              <span style={styles.stepText}>Audit Phase 0{step} / 03</span>
              <div style={styles.progressBarBg}>
                <div style={{ ...styles.progressBarFill, width: `${(step / 3) * 100}%` }} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 style={styles.questionText}>1. How do you currently capture primary client data and requirements?</h3>
              <div style={styles.optionGroup}>
                <button style={styles.optionBtn} onClick={() => handleSelection('dataCapture', 'Manual email threads and unstructured messages.', 10)}>
                  Manual email threads and unstructured messages.
                </button>
                <button style={styles.optionBtn} onClick={() => handleSelection('dataCapture', 'Basic generic forms (Google Forms, Typeform).', 5)}>
                  Basic generic forms (Google Forms, Typeform).
                </button>
                <button style={styles.optionBtn} onClick={() => handleSelection('dataCapture', 'Custom automated intake portals.', 0)}>
                  Custom automated intake portals.
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={styles.questionText}>2. What is your primary friction point during client onboarding or execution?</h3>
              <div style={styles.optionGroup}>
                <button style={styles.optionBtn} onClick={() => handleSelection('clientOnboarding', 'Chasing down missing files, payments, or approvals.', 10)}>
                  Chasing down missing files, payments, or approvals.
                </button>
                <button style={styles.optionBtn} onClick={() => handleSelection('clientOnboarding', 'Scope creep and misaligned client expectations.', 5)}>
                  Scope creep and misaligned client expectations.
                </button>
                <button style={styles.optionBtn} onClick={() => handleSelection('clientOnboarding', 'We have zero friction. Handoffs are seamless.', 0)}>
                  We have zero friction. Handoffs are seamless.
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={styles.questionText}>3. How long does your average administrative turnaround take before core work begins?</h3>
              <div style={styles.optionGroup}>
                <button style={styles.optionBtn} onClick={() => handleSelection('turnaroundTime', 'Days or weeks of manual back-and-forth.', 10)}>
                  Days or weeks of manual back-and-forth.
                </button>
                <button style={styles.optionBtn} onClick={() => handleSelection('turnaroundTime', 'A few hours of manual verification.', 5)}>
                  A few hours of manual verification.
                </button>
                <button style={styles.optionBtn} onClick={() => handleSelection('turnaroundTime', 'Instantaneous via automated triggers.', 0)}>
                  Instantaneous via automated triggers.
                </button>
              </div>
            </div>
          )}

          {step === 4 && renderDiagnosticResult()}
        </div>

        <div style={styles.footerGrid}>
          <div style={styles.footerItem}>
            <Icons.Server />
            <h4 style={styles.footerTitle}>The Cost of Friction</h4>
            <p style={styles.footerText}>Every manual data entry point introduces a failure vector. Scale requires immutability.</p>
          </div>
          <div style={styles.footerItem}>
            <Icons.Search />
            <h4 style={styles.footerTitle}>Diagnostic Precision</h4>
            <p style={styles.footerText}>Built on strict compliance protocols derived from central dispatch and logistics logic.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: '100vh', backgroundColor: '#050811', display: 'flex', justifyContent: 'center', padding: '40px 16px', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  wrapper: { width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' },
  forgePill: { fontSize: '10px', letterSpacing: '1.5px', fontWeight: 800, color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.15)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(168, 85, 247, 0.4)', display: 'inline-block', marginBottom: '12px' },
  heroHeading: { fontSize: '32px', fontWeight: 800, letterSpacing: '-0.5px', margin: '0 0 10px 0', background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroSubheading: { fontSize: '14px', color: '#94a3b8', lineHeight: 1.5, margin: 0, padding: '0 20px' },
  card: { backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '16px', padding: '30px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' },
  progressHeader: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' },
  stepText: { fontSize: '11px', color: '#94a3b8', fontWeight: 700, letterSpacing: '1px' },
  progressBarBg: { width: '100%', height: '4px', backgroundColor: '#0f172a', borderRadius: '2px', overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#a855f7', transition: 'width 0.4s ease' },
  questionText: { fontSize: '18px', fontWeight: 600, margin: '0 0 20px 0', color: '#f8fafc', lineHeight: 1.3 },
  optionGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  optionBtn: { width: '100%', textAlign: 'left', padding: '16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', color: '#cbd5e1', fontSize: '14px', fontWeight: 500, cursor: 'pointer' },
  resultCard: {},
  alertPill: { fontSize: '9px', letterSpacing: '1.5px', fontWeight: 800, color: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.15)', padding: '4px 10px', borderRadius: '999px', border: '1px solid #e11d48', display: 'inline-block', marginBottom: '12px' },
  heading: { fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.5px' },
  subtext: { fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: 0 },
  dataGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginTop: '24px' },
  dataBox: { backgroundColor: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #334155' },
  dataBoxActive: { backgroundColor: 'rgba(168, 85, 247, 0.1)', padding: '16px', borderRadius: '10px', border: '1px solid #a855f7' },
  dataTitle: { fontSize: '11px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px 0' },
  dataTitleActive: { fontSize: '11px', color: '#d8b4fe', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px 0', fontWeight: 800 },
  list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' },
  listItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#f8fafc' },
  primaryBtn: { width: '100%', padding: '16px', backgroundColor: '#a855f7', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  footerGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  footerItem: { backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b' },
  footerTitle: { fontSize: '12px', fontWeight: 700, color: '#e2e8f0', margin: '8px 0 4px 0' },
  footerText: { fontSize: '11px', color: '#64748b', lineHeight: 1.4, margin: 0 }
};
