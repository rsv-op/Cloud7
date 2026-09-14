'use client';

import React, { useState, useEffect } from 'react';
import { getLaunchData, getPricingTiers, getCategories } from '../utils/loadLaunchData';

const Icons = {
  SpeedDelivery: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  CheckCircle: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  Eye: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  Calendar: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  Laptop: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="20" x2="22" y2="20" /></svg>,
  Terminal: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
};

export default function LaunchSevenApp() {
  const launchMeta = getLaunchData();
  const pricingPlans = getPricingTiers();
  const categories = getCategories();

  const [navPage, setNavPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'Logistics & Supply Chain');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  
  const [subView, setSubView] = useState<string | null>(null); 
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState('Growth Engine');

  // Stealth Dev Auth State
  const [devClicks, setDevClicks] = useState(0);
  const [devAuthenticated, setDevAuthenticated] = useState(false);

  const [formData, setFormData] = useState({
    tier: 'Growth Engine',
    vertical: '',
    objective: '',
    archetype: '',
    feature: '',
    readiness: '',
    fullName: '',
    businessName: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Forced URL Parameter Interception
  useEffect(() => {
    const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    setDeliveryDate(target.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }));

    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const incomingVertical = searchParams.get('vertical');

      if (incomingVertical) {
        setTimeout(() => {
          setFormData(prev => ({ ...prev, vertical: incomingVertical }));
          setNavPage(3);
          setSubView('questionnaire');
          setStep(2); 
        }, 100);
        
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 6));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Stealth Developer Authentication Trigger
  const handleStealthClick = () => {
    if (devClicks + 1 === 5) {
      const pwd = window.prompt("CLOUD7 SYSADMIN AUTH:");
      if (pwd === "Ric96Cloud07") {
        setDevAuthenticated(true);
      }
      setDevClicks(0);
    } else {
      setDevClicks(c => c + 1);
    }
  };

  const getAmbientBackground = () => {
    if (devAuthenticated) return '#020617'; 
    switch (navPage) {
      case 1: return 'radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.4) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      case 3: return 'radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.35) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      default: return '#050811';
    }
  };

  // DEVELOPER DASHBOARD VIEW
  if (devAuthenticated) {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={{ ...styles.card, maxWidth: '700px', border: '1px solid #a855f7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #334155', paddingBottom: '16px' }}>
            <Icons.Terminal />
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#d8b4fe', margin: 0 }}>CLOUD7 MASTER OPERATIONS</h2>
            <span style={{ fontSize: '10px', backgroundColor: '#a855f7', padding: '2px 8px', borderRadius: '4px', marginLeft: 'auto' }}>ADMIN ACTIVE</span>
          </div>
          
          <h3 style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '12px' }}>Live Form State (Intake Memory)</h3>
          <pre style={{ backgroundColor: '#000000', padding: '16px', borderRadius: '8px', fontSize: '11px', color: '#34d399', overflowX: 'auto', border: '1px solid #1e293b' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>

          <button style={{ ...styles.secondaryBtn, marginTop: '24px' }} onClick={() => setDevAuthenticated(false)}>
            Close Admin Portal & Return to UI
          </button>
        </div>
      </main>
    );
  }

  // STANDARD CLIENT UI ROUTING
  if (submitted) {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={styles.card}>
          <h2 style={styles.title}>Deployment Authorized</h2>
          <p style={styles.text}>Specifications for <strong>{formData.businessName}</strong> are logged. Your 7-day clock begins upon payment confirmation.</p>
          <button style={styles.primaryBtn} onClick={() => alert(`Initiating payment for ${formData.tier}...`)}>Complete Payment</button>
        </div>
      </main>
    );
  }

  if (subView === 'questionnaire') {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={styles.card}>
          <div style={styles.progressBarContainer}>
            <div style={{ ...styles.progressBar, width: `${(step / 6) * 100}%` }} />
          </div>
          
          {step === 1 && (
            <div>
              <h3 style={styles.questionTitle}>1. What type of website is this for?</h3>
              {categories.map((item) => (
                <button key={item} style={formData.vertical === item ? styles.selectedOption : styles.optionBtn} onClick={() => { updateField('vertical', item); handleNext(); }}>{item}</button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={styles.questionTitle}>2. What is your primary objective?</h3>
              {/* BUG FIXED: Properly references styles object, not formData */}
              {['Capture Customer Inquiries & Leads', 'Sell Products', 'Build Brand Trust'].map((item) => (
                <button 
                  key={item} 
                  style={formData.objective === item ? styles.selectedOption : styles.optionBtn} 
                  onClick={() => { updateField('objective', item); handleNext(); }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step > 2 && step < 6 && (
            <div>
              <h3 style={styles.questionTitle}>Phase {step} Configuration</h3>
              <button style={styles.optionBtn} onClick={handleNext}>Confirm Standard Configuration</button>
            </div>
          )}

          {step === 6 && (
            <form onSubmit={handleSubmit}>
              <h3 style={styles.questionTitle}>6. Deployment Details</h3>
              <input style={styles.input} placeholder="Full Name" required onChange={(e) => updateField('fullName', e.target.value)} />
              <input style={styles.input} placeholder="Business Name" required onChange={(e) => updateField('businessName', e.target.value)} />
              <button type="submit" style={styles.primaryBtn}>Initialize Build</button>
            </form>
          )}

          {step > 1 && <button style={styles.backBtn} onClick={handleBack}>← Back</button>}
        </div>
      </main>
    );
  }

  return (
    <main style={{ ...styles.container, background: getAmbientBackground() }}>
      <div style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        <div style={styles.stepProgressRow}>
          <button style={navPage === 1 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(1)}>01. About</button>
          <button style={navPage === 2 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(2)}>02. Launch</button>
          <button style={navPage === 3 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(3)}>03. Action</button>
        </div>

        {navPage === 1 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <span style={styles.studioPill}>LAUNCH7 STUDIO</span>
              <h1 style={styles.landingHeroHeading}>{launchMeta.company.name}</h1>
              <p style={styles.landingHeroSubheading}>Custom websites delivered in seven days.</p>
            </div>
            <button style={styles.primaryBtn} onClick={() => setNavPage(2)}>View Timeline →</button>
          </div>
        )}

        {navPage === 2 && (
          <div style={styles.cardRelative}>
            <div style={styles.dynamicDateBox}>
              <Icons.Calendar />
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>If you start your build today:</span>
                <strong style={{ fontSize: '17px', color: '#38bdf8' }}>Live Launch by {deliveryDate}</strong>
              </div>
            </div>
            <button style={styles.primaryBtn} onClick={() => setNavPage(3)}>Continue <Icons.ArrowRight /></button>
          </div>
        )}

        {navPage === 3 && (
          <div style={styles.cardRelative}>
            <button style={styles.primaryBtn} onClick={() => setSubView('questionnaire')}>⚡ Build My Website Now</button>
          </div>
        )}

        {/* STEALTH DEV TRIGGER: Clicking this text 5 times triggers the password prompt */}
        <div style={styles.stealthFooter} onClick={handleStealthClick}>
          Operated by {launchMeta.company.parentEntity}
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box', transition: 'background 0.5s ease', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  cardRelative: { backgroundColor: 'rgba(15, 23, 42, 0.92)', width: '100%', borderRadius: '20px', padding: '24px 20px', border: '1px solid #1e293b' },
  card: { backgroundColor: '#1e293b', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '24px' },
  stepProgressRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', backgroundColor: '#090d16', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b' },
  stepBtn: { padding: '8px 2px', backgroundColor: 'transparent', color: '#64748b', border: '1px solid transparent', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' },
  stepBtnActive: { padding: '8px 2px', backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' },
  landingHeroHeading: { fontSize: '28px', fontWeight: 800, margin: '8px 0 6px 0', background: 'linear-gradient(135deg, #ffffff 20%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  landingHeroSubheading: { fontSize: '13px', color: '#cbd5e1', margin: '0 0 16px 0' },
  studioPill: { fontSize: '9px', letterSpacing: '1.2px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '3px 8px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)' },
  title: { fontSize: '22px', fontWeight: 800, marginBottom: '6px', textAlign: 'center' },
  text: { fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5, textAlign: 'center' },
  dynamicDateBox: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(2, 132, 199, 0.15)', border: '1px solid #0284c7', borderRadius: '10px', padding: '12px', marginBottom: '14px' },
  primaryBtn: { width: '100%', padding: '14px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  secondaryBtn: { width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' },
  questionTitle: { fontSize: '15px', fontWeight: 600, marginBottom: '14px' },
  optionBtn: { width: '100%', padding: '11px', backgroundColor: '#334155', color: '#f8fafc', border: 'none', borderRadius: '6px', textAlign: 'left', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' },
  selectedOption: { width: '100%', padding: '11px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', textAlign: 'left', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' },
  input: { width: '100%', padding: '11px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f8fafc', marginBottom: '10px', boxSizing: 'border-box' },
  progressBarContainer: { height: '4px', backgroundColor: '#334155', borderRadius: '2px', marginBottom: '12px' },
  progressBar: { height: '100%', backgroundColor: '#2563eb', transition: 'width 0.3s' },
  backBtn: { background: 'none', border: 'none', color: '#94a3b8', marginTop: '12px', cursor: 'pointer', fontSize: '12px', width: '100%', textAlign: 'center' },
  stealthFooter: { textAlign: 'center', fontSize: '11px', color: '#475569', marginTop: '20px', cursor: 'default', userSelect: 'none' }
};
